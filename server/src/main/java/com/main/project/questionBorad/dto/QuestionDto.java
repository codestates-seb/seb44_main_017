package com.main.project.questionBorad.dto;

import com.main.project.helper.validator.NotSpace;
import com.main.project.member.dto.MemberDto;
import com.main.project.questionComment.dto.QCommentDto;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

public class QuestionDto {

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post{
        @NotSpace
        private String title;
        @NotSpace
        private String content;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patch{
        @NotSpace
        private String title;
        @NotSpace
        private String content;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response{
        private long questionId;
        private String title;
        private String content;
        private LocalDateTime createAt;
        private LocalDateTime modifyAt;
        private int view;

        private MemberDto.WriterResponse writer;
        private List<QCommentDto.Response> qComments;



    }

}
