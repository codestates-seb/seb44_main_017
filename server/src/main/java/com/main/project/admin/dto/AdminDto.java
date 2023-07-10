package com.main.project.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class AdminDto {

    @Getter
    @AllArgsConstructor
    public static class Response{
        private Long adminId;
        private String name;
        private String email;
        private String phone;
    }

    @Getter
    @AllArgsConstructor
    public static class NotifyResponse{
        private long adminId;
        private String name;
    }

    @Getter
    @AllArgsConstructor
    public static class Post{
        @NotBlank(message = "공백이 아니어야 합니다.")
        @Size(min=1, max=30, message = "이름 길이는 최대 30입니다.")
        private String name;

        @NotBlank(message = "공백이 아니어야 합니다.")
        @Email(message = "이메일 형식이 올바르지 않습니다.")
        private String email;

        @NotBlank(message = "공백이 아니어야 합니다.")
        @Pattern(regexp = "^[A-Za-z\\d!@#$%^&*()_+~\\-=]{8,40}$")
        private String password;

        @Pattern(regexp = "^010-\\d{3,4}-\\d{4}",message = "휴대폰 번호는 010으로 시작하는 11자리 숫자와 '-'로 구성되어야 합니다.")
        private String phone;

    }
}
