package com.main.project.exception;

import lombok.Getter;

@Getter
public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    MEMBER_EMAIL_EXISTS(409, "Email exists"),
    PRODUCT_NOT_FOUND(404, "Product not found"),
    ADMIN_NOT_FOUND(404,"Admin not found"),
    ADMIN_EXISTS(409,"Admin exists"),
    REFRESH_NOT_FOUND(404,"RefreshToken not found"),
    QUESTION_NOT_FOUND(404, "Question not found"),
    INVALID_SORT_PARAMETER(400, "Invalid parameter named 'sort'"),
    NOTIFY_NOT_FOUND(404, "Notify not found");

    private final int status;
    private final String message;

    ExceptionCode(int statusCode, String message){
        this.status = statusCode;
        this.message = message;
    }
}
