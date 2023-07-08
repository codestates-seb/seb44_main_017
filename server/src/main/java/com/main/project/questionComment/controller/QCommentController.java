package com.main.project.questionComment.controller;


import com.main.project.questionComment.dto.QCommentDto;
import com.main.project.questionComment.service.QCommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/questions/{question-id}/comments")
public class QCommentController {

    private final QCommentService service;

    public QCommentController(QCommentService service) {
        this.service = service;
    }


    // 댓글 등록
    @PostMapping
    public ResponseEntity postQComment(@RequestBody @Valid QCommentDto.Post requestBody,
                                       @RequestHeader("refresh") String refreshToken,
                                       @PathVariable("question-id") @Positive long questionId){
        service.createQComment(requestBody,refreshToken,questionId);

        return new ResponseEntity(HttpStatus.CREATED);
    }

    //댓글 수정
    @PatchMapping("{comment-id}")
    public ResponseEntity patchQComment(@RequestBody QCommentDto.Patch requestBody,
                                        @RequestHeader("refresh") String refreshToken,
                                        @PathVariable("comment-id") @Positive long commentId){
        QCommentDto.Response response = service.updateQComment(commentId,requestBody,refreshToken);
        return new ResponseEntity(response,HttpStatus.OK);
    }

    //댓글 삭제
    @DeleteMapping("{comment-id}")
    public ResponseEntity deleteQComment(@PathVariable("comment-id") @Positive long commentId,
                                         @RequestHeader("refresh") String refreshToken){
        service.removeQComment(commentId,refreshToken);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }



}
