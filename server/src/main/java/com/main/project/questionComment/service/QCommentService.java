package com.main.project.questionComment.service;

import com.main.project.admin.entity.Admin;
import com.main.project.admin.service.AdminService;
import com.main.project.exception.businessLogicException.BusinessLogicException;
import com.main.project.exception.businessLogicException.ExceptionCode;
import com.main.project.member.entity.Member;
import com.main.project.member.entity.RefreshToken;
import com.main.project.member.service.MemberService;
import com.main.project.member.service.RefreshTokenService;
import com.main.project.questionBorad.entity.Question;
import com.main.project.questionBorad.service.QuestionService;
import com.main.project.questionComment.dto.QCommentDto;
import com.main.project.questionComment.entity.QComment;
import com.main.project.questionComment.mapper.QCommentMapper;
import com.main.project.questionComment.repository.QCommentRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class QCommentService {
    private final AdminService adminService;
    private final MemberService memberService;
    private final QuestionService questionService;
    private final QCommentRepository qCommentRepository;

    private final RefreshTokenService refreshTokenService;
    private final QCommentMapper mapper;

    public QCommentService(AdminService adminService, MemberService memberService, QuestionService questionService,
                           QCommentRepository qCommentRepository, RefreshTokenService refreshTokenService,
                           QCommentMapper mapper) {
        this.adminService = adminService;
        this.memberService = memberService;
        this.questionService = questionService;
        this.qCommentRepository = qCommentRepository;
        this.refreshTokenService = refreshTokenService;
        this.mapper = mapper;
    }
    // 댓글 등록
    public void createQComment(QCommentDto.Post requestBody,String refreshToken,long questionId){
        QComment qComment = mapper.QCommentDtoPostToQComment(requestBody);
        RefreshToken token = refreshTokenService.findRefreshToken(refreshToken);
        Question question = questionService.findExistsQuestion(questionId);
        Admin admin = adminService.findAdminById(token.getAdminId());
        //관리자 작성자 등록
        admin.setQComments(qComment);
        question.setQComments(qComment);

        qCommentRepository.save(qComment);
    }
    // 댓글 수정
    public QCommentDto.Response updateQComment(long commentId,QCommentDto.Patch requestBody,
                                               String refreshToken){
        QComment findQComment =findExistsQComment(commentId);

        // 유저와 작성자 일치 여부
        userIsEqualAdmin(refreshToken,commentId);

        QComment patchQComment = mapper.QCommentDtoPatchToQComment(requestBody);

        findQComment.setContent(patchQComment.getContent());

        QCommentDto.Response response = mapper.QCommentToQCommentDtoResponse(findQComment);

        // 저장

        qCommentRepository.save(findQComment);

        return response;
    }


    // 댓글 삭제
    public void removeQComment(long commentId,String refreshToken){
        findExistsQComment(commentId);
            // 유저와 작성자 일치 여부
        userIsEqualAdmin(refreshToken,commentId);

        qCommentRepository.deleteById(commentId);


    }

    public QComment findExistsQComment(long commentId){
       Optional<QComment> optionalQComment = qCommentRepository.findById(commentId);

       return optionalQComment.orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_COMMENT_NOT_FOUND));
    }

    //관리자인지 확인하는 코드
    public boolean userIsEqualAdmin(String refreshToken,long commentId){
        long user = refreshTokenService.findRefreshToken(refreshToken).getAdminId();
        long writerId = findExistsQComment(commentId).getWriter().getAdminId();
        if (user == writerId){
            return true;
        }else{
            throw new BusinessLogicException(ExceptionCode.NOT_WRITER);
        }

    }
}
