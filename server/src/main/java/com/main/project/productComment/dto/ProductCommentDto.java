package com.main.project.productComment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

public class ProductCommentDto {

    @Getter
    @AllArgsConstructor
    public static class Response{
        private String content;
        private LocalDate createAt;
        private LocalDate modifyAt;
    }

    @Getter
    @AllArgsConstructor
    public static class Post{
        private String content;
    }

}
