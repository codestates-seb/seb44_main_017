package com.main.project.exception;

import lombok.Getter;

@Getter
public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    MEMBER_EMAIL_EXISTS(409, "Email exists"),
    ADMIN_NOT_FOUND(404,"Admin not found"),
    ADMIN_EXISTS(409,"Admin exists");
    private final int status;
    private final String message;

    ExceptionCode(int statusCode, String message){
        this.status = statusCode;
        this.message = message;
    }
}
