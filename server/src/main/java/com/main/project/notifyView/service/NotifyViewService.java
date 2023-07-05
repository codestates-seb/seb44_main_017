package com.main.project.notifyView.service;


import com.main.project.member.entity.Member;
import com.main.project.member.entity.RefreshToken;
import com.main.project.member.service.MemberService;
import com.main.project.member.service.RefreshTokenService;
import com.main.project.notifyBoard.entity.NotifyBoard;
import com.main.project.notifyBoard.service.NotifyService;
import com.main.project.notifyView.entity.NotifyView;
import com.main.project.notifyView.notifyViewRepository.NotifyViewRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class NotifyViewService {
    private final MemberService memberService;
    private final RefreshTokenService refreshTokenService;

    private final NotifyViewRepository notifyViewRepository;

    public NotifyViewService(MemberService memberService, RefreshTokenService refreshTokenService
            , NotifyViewRepository notifyViewRepository) {
        this.memberService = memberService;
        this.refreshTokenService = refreshTokenService;

        this.notifyViewRepository = notifyViewRepository;
    }

    public void createView(NotifyBoard board,String refreshToken){
        RefreshToken token= refreshTokenService.findRefreshToken(refreshToken);
        Member user = memberService.findVerifiedMember(token.getMemberId());

        NotifyView notifyView = new NotifyView();
        notifyView.setNotifyBoard(board);
        notifyView.setUsers(user);

        user.setViews(notifyView);
        board.setViews(notifyView);

        notifyViewRepository.save(notifyView);
    }

    public boolean isViewId(String refreshToken){
        RefreshToken token= refreshTokenService.findRefreshToken(refreshToken);
        if(notifyViewRepository.findByMemberId(token.getMemberId())!=null){
            return true;
        }else{
            return false;
        }
    }
}
