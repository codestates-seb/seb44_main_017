package com.main.project.order.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class OrderDto {
    @Getter
    @AllArgsConstructor
    public static class KakaoOrder{
        private Long memberId;
        private String email;

        private String profile;
        private String name;
        private String phone;
        private int money;
        private boolean isban;
    }
    @Getter
    @AllArgsConstructor
    public static class Post{
        private String postnum;
        private String address;
        private String reciver;
        private String reciverphone;
        private Integer pointspend;

    }

    @Getter
    @AllArgsConstructor
    public static class Postbucket{
        private String postnum;
        private String address;
        private String reciver;
        private String reciverphone;
        private Integer pointspend;
        private String productlist;

    }
}
