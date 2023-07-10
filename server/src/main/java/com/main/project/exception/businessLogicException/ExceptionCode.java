package com.main.project.exception.businessLogicException;

import lombok.Getter;

@Getter
public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    MEMBER_EMAIL_EXISTS(409, "Email exists"),
    PRODUCT_NOT_FOUND(404, "Product not found"),
    COMMENT_NOT_FOUND(404, "Comment not found"),
    ADMIN_NOT_FOUND(404,"Admin not found"),
    ADMIN_EXISTS(409,"Admin exists"),
    NOT_WRITER(403,"Not writer"),
    REFRESH_NOT_FOUND(404,"RefreshToken not found"),
    QUESTION_NOT_FOUND(404, "Question not found"),
    QUESTION_COMMENT_NOT_FOUND(404,"Question Comment not found"),
    INVALID_SORT_PARAMETER(400, "Invalid parameter named 'sort'"),
    NOTIFY_NOT_FOUND(404, "Notify not found"),
    PRODUCTDENY_EXISTS(409,"Productdeny exists"),
    PRODUCT_EXISTS(409,"Product exists"),
    NO_PRODUCTS(409, "No products in order"),
    ORDERPRODUCT_NOT_FOUND(409,"Orderproduct_not_found"),
    PAY_CANCEL(404,"Pay_cancel"),
    PAY_FAILED(404,"Pay_failed"),
    SOLD_OUT(404, "Product_Sold_Out"),
    NOT_ENOUGH_POINT(409,"point_is_not_enough"),
    MEMBER_IS_BAN(409, "Member is ban");

    private final int status;
    private final String message;

    ExceptionCode(int statusCode, String message){
        this.status = statusCode;
        this.message = message;
    }
}
