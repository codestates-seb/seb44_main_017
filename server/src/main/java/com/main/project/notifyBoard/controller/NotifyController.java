package com.main.project.notifyBoard.controller;


import com.main.project.notifyBoard.dto.NotifyDto;
import com.main.project.notifyBoard.service.NotifyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

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
    public ResponseEntity postNotify(@RequestBody @Valid NotifyDto.Post requestBody){
        service.createNotify(requestBody);

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
                                      @PathVariable @Positive String sort){



        return new ResponseEntity(HttpStatus.OK);
    }

    // 상세 공지 조회
    @GetMapping("/{board-id}")
    public ResponseEntity getNotify(@PathVariable("board-id") @Positive long boardId){
        return new ResponseEntity(service.getNotify(boardId),HttpStatus.OK);
    }

    //질문 삭제
    @DeleteMapping("/{board-id}")
    public ResponseEntity deleteNotify(@PathVariable("board-id") @Positive long boardId){
        service.removeNotify(boardId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
