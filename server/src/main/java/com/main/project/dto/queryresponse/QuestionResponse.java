package com.main.project.dto.queryresponse;

import com.main.project.questionBorad.entity.Question;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class QuestionResponse {
    private final Long questionId;
    private final Integer view;
    private final String title;
    private final String content;
    private final LocalDateTime createAt;
    private final LocalDateTime modifyAt;

    @Builder
    @QueryProjection
    public QuestionResponse(Long questionId, Integer view, String title, String content, LocalDateTime createAt, LocalDateTime modifyAt){
        this.questionId = questionId;
        this.view = view;
        this.title = title;
        this.content = content;
        this.createAt = createAt;
        this.modifyAt = modifyAt;
    }

    public static QuestionResponse of(Question question){
        return new QuestionResponse(question.getQuestionId(),question.getView(),question.getTitle(),question.getContent(),question.getCreateAt(),question.getModifyAt());
    }
}
