package com.main.project.questionBorad.controller;

import com.main.project.questionBorad.dto.QuestionDto;
import com.main.project.questionBorad.dto.QuestionsResponseDto;
import com.main.project.questionBorad.entity.Question;
import com.main.project.questionBorad.service.QuestionService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/questions")
public class QuestionController {

    private final QuestionService service;

    public QuestionController(QuestionService service) {
        this.service = service;
    }

    // 질문 등록
    @PostMapping
    public ResponseEntity postQuestion(@RequestBody @Valid QuestionDto.Post requestBody,
                                       @RequestHeader("refresh")String refreshToken){
        service.createQuestion(requestBody,refreshToken);

        return new ResponseEntity(HttpStatus.CREATED);
    }

    //질문 수정
    @PatchMapping("/{question-id}")
    public ResponseEntity patchQuestion(@RequestBody @Valid QuestionDto.Patch requestBody,
                                        @PathVariable("question-id") @Positive long questionId,
                                        @RequestHeader("refresh")String refreshToken){
        QuestionDto.Response response = service.updateQuestion(questionId,requestBody,refreshToken);
        return new ResponseEntity(response,HttpStatus.CREATED);
    }


    // 질문 전체 페이지 조회
    @GetMapping("/board")
    public ResponseEntity getQuestions(@RequestParam int page,
                                       @RequestParam int size,
                                       @RequestParam String sort){
        Page<Question> pageQuestions =service.sortingQuestions(page-1,size,sort);
        List<QuestionDto.Response> questions=service.getQuestions(page-1,size,sort);

        return new ResponseEntity(new QuestionsResponseDto(questions,pageQuestions),HttpStatus.OK);
    }

    // 질문 상세 페이지 조회
    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(@PathVariable("question-id") @Positive long questionId,
                                      @RequestHeader(value = "refresh",required = false)String refreshToken){
        QuestionDto.Response response =service.getQuestion(questionId,refreshToken);

        return new ResponseEntity(response,HttpStatus.OK);
    }

    //질문 삭제
    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(@PathVariable("question-id") @Positive long questionId,
                                         @RequestHeader("refresh")String refreshToken){
        service.removeQuestion(questionId,refreshToken);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }



}
