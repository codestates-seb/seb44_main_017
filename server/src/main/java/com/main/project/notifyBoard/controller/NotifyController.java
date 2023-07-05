package com.main.project.notifyBoard.controller;


import com.main.project.notifyBoard.dto.NotifiesResponseDto;
import com.main.project.notifyBoard.dto.NotifyDto;
import com.main.project.notifyBoard.entity.NotifyBoard;
import com.main.project.notifyBoard.service.NotifyService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/notify")
@Validated
public class NotifyController {

    private final NotifyService service;


    public NotifyController(NotifyService service) {
        this.service = service;
    }

    // 공지 등록
    @PostMapping
    public ResponseEntity postNotify(@RequestBody @Valid NotifyDto.Post requestBody, @RequestHeader("refresh")String refreshToken){
        service.createNotify(requestBody,refreshToken);

        return new ResponseEntity(HttpStatus.CREATED);
    }
    //공지 수정
    @PatchMapping("/{board-id}")
    public ResponseEntity patchNotify(@RequestBody @Valid NotifyDto.Patch requestBody,
                                      @PathVariable("board-id") @Positive long boardId){
        service.updateNotify(boardId,requestBody);

        return new ResponseEntity(HttpStatus.OK);
    }

    // 공지 전체페이지 조회
    @GetMapping("/board")
    public ResponseEntity getNotifies(@RequestParam @Positive int page,
                                      @RequestParam @Positive int size,
                                      @RequestParam String sort){
        Page<NotifyBoard> pageNotifies = service.sortingNotifies(page - 1, size, sort);
        List<NotifyDto.Response> notifies = service.getNotifies(page-1,size,sort);

        return new ResponseEntity(new NotifiesResponseDto(notifies,pageNotifies),HttpStatus.OK);
    }

    // 상세 공지 조회
    @GetMapping("/{board-id}")
    public ResponseEntity getNotify(@PathVariable("board-id") @Positive long boardId,
                                    @RequestHeader("refresh")String refreshToken){

        return new ResponseEntity(service.getNotify(boardId,refreshToken),HttpStatus.OK);
    }

    //질문 삭제
    @DeleteMapping("/{board-id}")
    public ResponseEntity deleteNotify(@PathVariable("board-id") @Positive long boardId){
        service.removeNotify(boardId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
