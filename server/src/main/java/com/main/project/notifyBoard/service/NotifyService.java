package com.main.project.notifyBoard.service;


import com.main.project.admin.entity.Admin;
import com.main.project.admin.service.AdminService;
import com.main.project.exception.businessLogicException.BusinessLogicException;
import com.main.project.exception.businessLogicException.ExceptionCode;
import com.main.project.member.entity.RefreshToken;
import com.main.project.member.service.RefreshTokenService;
import com.main.project.notifyBoard.dto.NotifyDto;
import com.main.project.notifyBoard.entity.NotifyBoard;
import com.main.project.notifyBoard.mapper.NotifyMapper;
import com.main.project.notifyBoard.repository.NotifyRepository;
import com.main.project.notifyView.service.NotifyViewService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class NotifyService {
    private final NotifyViewService notifyViewService;
    private final RefreshTokenService refreshTokenService;
    private final AdminService adminService;
    private final NotifyRepository notifyRepository;
    private final NotifyMapper mapper;

    public NotifyService(NotifyViewService notifyViewService, RefreshTokenService refreshTokenService,
                         AdminService adminService, NotifyRepository notifyRepository,
                         NotifyMapper mapper) {
        this.notifyViewService = notifyViewService;
        this.refreshTokenService = refreshTokenService;
        this.adminService = adminService;
        this.notifyRepository = notifyRepository;
        this.mapper = mapper;
    }

    // 공지 등록
    public void createNotify(NotifyDto.Post requestBody, String refreshToken){
        NotifyBoard board = mapper.notifyDtoPostToNotifyBoard(requestBody);
        RefreshToken Token= refreshTokenService.findRefreshToken(refreshToken);
        Admin admin = adminService.findAdminById(Token.getAdminId());
        //admin에 공지 저장
        admin.setNotifies(board);
        // 공지사항에 저장
        notifyRepository.save(board);
    }
//     공지 수정
    public NotifyDto.Response updateNotify(long boardId,NotifyDto.Patch requestBody){
        NotifyBoard findBoard = findExistsNotify(boardId);
        NotifyBoard patchBoard = mapper.notifyDtoPatchToNotifyBoard(requestBody);

        Optional.ofNullable(patchBoard.getTitle()).ifPresent(findBoard::setTitle);
        Optional.ofNullable(patchBoard.getContent()).ifPresent(findBoard::setContent);

        NotifyDto.Response response = mapper.notifyBoardToNotifyResponse(findBoard);

        // 저장
        notifyRepository.save(findBoard);

        return response;

    }

    // 상세 공지 찾기
    public NotifyDto.Response getNotify(long boardId,String refreshToken){
        NotifyBoard board =findExistsNotify(boardId);
        // 로그인 /비로그인 여부 확인
        if(refreshToken!=null){
            // 멤버인지 관리자 인지 구분
            if(refreshTokenService.MemberBool(refreshToken)== true) {
                // 조회 여부 확인 false일 시 조회수 증가
                if (notifyViewService.isViewId(refreshToken,boardId) == false) {
                    board.setView();
                    notifyViewService.createView(board, refreshToken);
                }
            }
        }
        NotifyDto.Response response = mapper.notifyBoardToNotifyResponse(board);
        return response;
    }

    //전체 공지 페이지 조회
    public List<NotifyDto.Response> getNotifies(int page, int size, String sort){
        Page<NotifyBoard> pageNotifies = sortingNotifies(page,size,sort);

        List<NotifyBoard> notifies = pageNotifies.getContent();

        return mapper.notifiesToMultiResponseDtos(notifies);
    }

    // sort 분류
    public Page<NotifyBoard> sortingNotifies(int page, int size, String sort){
        if(sort.equals("newest")){
            return notifyRepository.findAll(
                    PageRequest.of(page,size, Sort.by("boardId").descending()
                    ));
        } else if (sort.equals("oldest")) {
            return notifyRepository.findAll(
                    PageRequest.of(page,size, Sort.by("boardId").ascending()
                    ));
        } else if (sort.equals("mostview")) {
            return notifyRepository.findAll(
                    PageRequest.of(page,size,Sort.by("view").descending()
                            .and(Sort.by("boardId").descending()))
            );
        }else {
            throw new BusinessLogicException(ExceptionCode.INVALID_SORT_PARAMETER);
        }
    }

    //공지 삭제
    public void removeNotify(long boardId){

        findExistsNotify(boardId);
        notifyRepository.deleteById(boardId);
    }

    // 공지 존재 여부 밑 id로 찾기
    public NotifyBoard findExistsNotify(long boardId) {
        Optional<NotifyBoard> optionalNotifyBoard = notifyRepository.findById(boardId);
        return optionalNotifyBoard.orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOTIFY_NOT_FOUND));
    }

}
