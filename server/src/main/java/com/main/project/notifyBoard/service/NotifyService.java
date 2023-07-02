package com.main.project.notifyBoard.service;


import com.main.project.exception.BusinessLogicException;
import com.main.project.exception.ExceptionCode;
import com.main.project.notifyBoard.dto.NotifyDto;
import com.main.project.notifyBoard.entity.NotifyBoard;
import com.main.project.notifyBoard.mapper.NotifyMapper;
import com.main.project.notifyBoard.repository.NotifyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class NotifyService {

    private final NotifyRepository notifyRepository;
    private final NotifyMapper mapper;

    public NotifyService(NotifyRepository notifyRepository, NotifyMapper mapper) {
        this.notifyRepository = notifyRepository;
        this.mapper = mapper;
    }

    // 공지 등록
    public void createNotify(NotifyDto.Post requestBody){
        NotifyBoard board = mapper.notifyDtoPostToNotifyBoard(requestBody);
        notifyRepository.save(board);
    }
//     공지 수정
    public NotifyDto.Response updateNotify(long boardId,NotifyDto.Patch requestBody){
        NotifyBoard findBoard = findExistsNotify(boardId);
        NotifyBoard patchBoard = mapper.notifyDtoPatchToNotifyBoard(requestBody);

        Optional.ofNullable(patchBoard.getTitle()).ifPresent(findBoard::setTitle);
        Optional.ofNullable(patchBoard.getContent()).ifPresent(findBoard::setContent);

        NotifyDto.Response response = mapper.notifyBoardToNotifyResponse(findBoard);

        return response;

    }

    // 상세 공지 찾기
    public NotifyDto.Response getNotify(long boardId){
        NotifyBoard board =findExistsNotify(boardId);
        NotifyDto.Response response = mapper.notifyBoardToNotifyResponse(board);
        return response;
    }

    //전체 공지 페이지 조회
    public void getNotifies(){

    }

    //공지 삭제
    public void removeNotify(long boardId){
        NotifyBoard findNotify = findExistsNotify(boardId);
        notifyRepository.deleteById(boardId);
    }
    // 공지 존재 여부 밑 id로 찾기
    public NotifyBoard findExistsNotify(long questionId) {
        Optional<NotifyBoard> optionalNotifyBoard = notifyRepository.findById(questionId);
        return optionalNotifyBoard.orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOTIFY_NOT_FOUND));
    }
}
