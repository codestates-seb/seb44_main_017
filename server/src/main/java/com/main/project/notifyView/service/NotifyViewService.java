package com.main.project.notifyView.service;


import com.main.project.member.entity.Member;
import com.main.project.member.entity.RefreshToken;
import com.main.project.member.service.MemberService;
import com.main.project.member.service.RefreshTokenService;
import com.main.project.notifyBoard.entity.NotifyBoard;
import com.main.project.notifyView.entity.NotifyView;
import com.main.project.notifyView.repository.NotifyViewRepository;
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
        notifyView.setBoard(board);
        notifyView.setUsers(user);

        user.setNViews(notifyView);
        board.setNViews(notifyView);

        notifyViewRepository.save(notifyView);
    }

    public boolean isViewId(String refreshToken,long boardId){
        RefreshToken token= refreshTokenService.findRefreshToken(refreshToken);

        return notifyViewRepository.findByMemberIdAndBoardId(token.getMemberId(),boardId).isPresent();

    }


}
