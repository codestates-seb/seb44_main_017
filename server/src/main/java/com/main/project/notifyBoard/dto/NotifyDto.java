package com.main.project.notifyBoard.dto;

import com.main.project.helper.validator.NotSpace;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

public class NotifyDto {

    @Builder
    @Getter
    @Setter
    public static class Post{
        @NotSpace
        private String title;
        @NotSpace
        private String content;
    }

    @Builder
    @Getter
    @Setter
    public static class Patch{
        private long boardId;
        @NotSpace
        private String title;
        @NotSpace
        private String content;

    }

    @Builder
    @Getter
    @Setter
    public static class Response{
        private long boardId;
        private String title;
        private String content;
        private LocalDateTime createAt;

    }

}
