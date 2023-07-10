package com.main.project.product.dto;

import com.main.project.product.entity.Product;
import com.main.project.productComment.ProductComment;
import com.main.project.productComment.dto.ProductCommentDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class ProductDto {
    @Setter
    @Getter
    @AllArgsConstructor
    public static class Response{
        private Long productId;
        private String name;
        private String title;
        private String content;
        private Integer price;
        private String category;
        private Long memberId;
        private Integer view;
        private Boolean productLike;
        private String imageLink;
        private Boolean issell;
        private LocalDateTime createAt;
        private LocalDateTime modifyAt;
        private Integer conditionValue;
        private Integer pointValue;

    }

    @Setter
    @Getter
    @AllArgsConstructor
    public static class ResponseWithComments{
        private Long productId;
        private String name;
        private String title;
        private String content;
        private Integer price;
        private String category;
        private Long memberId;
        private Integer view;
        private Boolean productLike;
        private String imageLink;
        private Boolean issell;
        private LocalDateTime createAt;
        private LocalDateTime modifyAt;
        private Integer conditionValue;
        private Integer pointValue;
        private List<ProductCommentDto.Response> comments;

    }

    @Getter
    @AllArgsConstructor
    public static class Post{
        @NotBlank(message = "공백이 아니어야 합니다.")
        private String name;

        @NotBlank(message = "공백이 아니어야 합니다.")
        private String title;

        private String content;

        private Long memberId;

        @Range(min = 0, message = "가격은 0 혹은 양수만 가능합니다.")
        private Integer price;

        private String category;

        private String imageLink;

        @Range(max = 10)
        private Integer conditionValue;

        @Range(min = 0, message = "포인트는 0 혹은 양수만 가능합니다.")
        private Integer pointValue;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patch{
        @NotBlank(message = "공백이 아니어야 합니다.")
        private String name;

        @NotBlank(message = "공백이 아니어야 합니다.")
        private String title;

        private String content;

        @Range(min = 0, message = "가격은 0 혹은 양수만 가능합니다.")
        private Integer price;

        private String category;

        private String imageLink;

        @Range(max = 10)
        private Integer conditionValue;

        @Range(min = 0, message = "포인트는 0 혹은 양수만 가능합니다.")
        private Integer pointValue;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserPP{
        @NotBlank(message = "공백이 아니어야 합니다.")
        private String name;

        @NotBlank(message = "공백이 아니어야 합니다.")
        private String title;

        private String content;

        private String category;

        private String imageLink;

    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Postdeny{
        @NotBlank(message = "공백이 아니어야 합니다.")
        private String denycontent;

    }

    @Getter
    @Setter
    public static class Postlist{
        List<UserPP> productlist;
    }

}
