package com.main.project.questionView.service;

import com.main.project.member.entity.Member;
import com.main.project.member.entity.RefreshToken;
import com.main.project.member.service.MemberService;
import com.main.project.member.service.RefreshTokenService;
import com.main.project.notifyBoard.entity.NotifyBoard;
import com.main.project.notifyView.entity.NotifyView;
import com.main.project.notifyView.repository.NotifyViewRepository;
import com.main.project.questionBorad.entity.Question;
import com.main.project.questionView.entity.QuestionView;
import com.main.project.questionView.repository.QuestionViewRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class QuestionViewService {
    private final MemberService memberService;
    private final RefreshTokenService refreshTokenService;

    private final QuestionViewRepository questionViewRepository;

    public QuestionViewService(MemberService memberService, RefreshTokenService refreshTokenService
            , QuestionViewRepository questionViewRepository) {
        this.memberService = memberService;
        this.refreshTokenService = refreshTokenService;

        this.questionViewRepository = questionViewRepository;
    }

    public void createView(Question question, String refreshToken){
        RefreshToken token= refreshTokenService.findRefreshToken(refreshToken);
        Member user = memberService.findVerifiedMember(token.getMemberId());

        QuestionView questionView = new QuestionView();
        questionView.setQuestion(question);
        questionView.setUsers(user);

        user.setQViews(questionView);
        question.setQViews(questionView);

        questionViewRepository.save(questionView);
    }

    public boolean isViewId(String refreshToken,long questionId){
        RefreshToken token= refreshTokenService.findRefreshToken(refreshToken);

        return questionViewRepository.findByMemberIdAndQuestionId(token.getMemberId(),questionId).isPresent();

    }


}
