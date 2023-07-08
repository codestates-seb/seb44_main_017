package com.main.project.questionComment.dto;

import com.main.project.admin.dto.AdminDto;
import com.main.project.helper.validator.NotSpace;
import com.main.project.member.dto.MemberDto;
import lombok.*;

import java.time.LocalDateTime;

public class QCommentDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Post{
        @NotSpace
        private String content;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Patch{
        @NotSpace
        private String content;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response{
        private long commentId;
        private String content;
        private LocalDateTime createAt;
        private LocalDateTime modifyAt;

        private AdminDto.NotifyResponse admin;
    }

}
