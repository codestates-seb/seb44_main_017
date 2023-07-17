package com.main.project.questionBorad.service;

import com.main.project.exception.businessLogicException.BusinessLogicException;
import com.main.project.exception.businessLogicException.ExceptionCode;
import com.main.project.member.entity.Member;
import com.main.project.member.entity.RefreshToken;
import com.main.project.member.service.MemberService;
import com.main.project.member.service.RefreshTokenService;
import com.main.project.questionBorad.dto.QuestionDto;
import com.main.project.questionBorad.entity.Question;
import com.main.project.questionBorad.mapper.QuestionMapper;
import com.main.project.questionBorad.repository.QuestionRepository;
import com.main.project.questionView.service.QuestionViewService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {
    private final RefreshTokenService refreshTokenService;
    private final QuestionMapper mapper;

    private final QuestionViewService questionViewService;
    private final MemberService memberService;

    private final QuestionRepository questionRepository;

    public QuestionService(RefreshTokenService refreshTokenService, QuestionMapper mapper, QuestionViewService questionViewService, MemberService memberService, QuestionRepository questionRepository) {
        this.refreshTokenService = refreshTokenService;
        this.mapper = mapper;
        this.questionViewService = questionViewService;
        this.memberService = memberService;
        this.questionRepository = questionRepository;
    }

    //질문 등록
    public void createQuestion(QuestionDto.Post requestBody,String refreshToken){
        Question question = mapper.questionDtoPostToQuestion(requestBody);
        RefreshToken token = refreshTokenService.findRefreshToken(refreshToken);
        Member user = memberService.findVerifiedMember(token.getMemberId());
        // writer 질문 저장
        user.setQuestions(question);

        questionRepository.save(question);
    }

    //질문 수정
    public QuestionDto.Response updateQuestion(long questionId ,QuestionDto.Patch requestBody,String refreshToken){
        // 질문 존재 여부
        Question findQuestion =findExistsQuestion(questionId);
        //작성자 확인 여부
        userIsEqualWriter(refreshToken,questionId);

        Question patchQuestion = mapper.questionDtoPatchToQuestion(requestBody);

        Optional.ofNullable(patchQuestion.getTitle()).ifPresent(findQuestion::setTitle);
        Optional.ofNullable(patchQuestion.getContent()).ifPresent(findQuestion::setContent);

        QuestionDto.Response response = mapper.questionToQuestionDtoResponse(findQuestion);

        questionRepository.save(findQuestion);

        return response;
    }
    //질문 상세 조회
    public QuestionDto.Response getQuestion(long questionId,String refreshToken){
        Question question = findExistsQuestion(questionId);
        if(refreshToken!=null){
            // 멤버인지 관리자 인지 구분
            if(refreshTokenService.MemberBool(refreshToken)== true) {
                // 조회 여부 확인 false일 시 조회수 증가
                if (questionViewService.isViewId(refreshToken,questionId) == false) {
                    question.setView(); // 저장
                    questionViewService.createView(question, refreshToken);
                }
            }
        }
        QuestionDto.Response response= mapper.questionToQuestionDtoResponse(question);

        return response;
    }
    // 질문 전체 조회
    public List<QuestionDto.Response> getQuestions(int page,int size, String sort){
        Page<Question> pageQuestions = sortingQuestions(page,size,sort);
        List<Question> questions = pageQuestions.getContent();


        return mapper.questionsToMultiResponseDtos(questions);

    }

    // sort 분류
    public Page<Question> sortingQuestions(int page, int size, String sort){
        if(sort.equals("newest")){
            return questionRepository.findAll(
                    PageRequest.of(page,size, Sort.by("questionId").descending()
                    ));
        } else if (sort.equals("oldest")) {
            return questionRepository.findAll(
                    PageRequest.of(page,size, Sort.by("questionId").ascending()
                    ));
        } else if (sort.equals("mostview")) {
            return questionRepository.findAll(
                    PageRequest.of(page,size,Sort.by("view").descending()
                            .and(Sort.by("questionId").descending()))
            );
        }else {
            throw new BusinessLogicException(ExceptionCode.INVALID_SORT_PARAMETER);
        }
    }


    // 질문 삭제
    public void removeQuestion(long questionId,String refreshToken){
        findExistsQuestion(questionId);
        if (refreshTokenService.MemberBool(refreshToken)== true){
            //작성자 확인 여부
            userIsEqualWriter(refreshToken,questionId);

            questionRepository.deleteById(questionId);

        }else {
            questionRepository.deleteById(questionId);
        }
    }

    // id로 질문 찾기
    public Question findExistsQuestion(long questionId) {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        return optionalQuestion.orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
    }

    // 현재 로그인 유저와 작성자 일치 여부
    public boolean userIsEqualWriter(String refreshToken,long questionId){
       long user = refreshTokenService.findRefreshToken(refreshToken).getMemberId();
       long writerId = findExistsQuestion(questionId).getWriter().getMemberId();
        if (user == writerId){
            return true;
        }else{
            throw new BusinessLogicException(ExceptionCode.NOT_WRITER);
        }

    }
}
