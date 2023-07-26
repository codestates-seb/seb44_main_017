package com.main.project.dto.queryresponse;

import com.main.project.product.entity.Product;
import com.querydsl.core.annotations.QueryProjection;
import com.querydsl.core.types.Expression;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ProductWithLikedResponse {
    private final Long productId;
    private final Long memberId;
    private final String category;
    private final String name;
    private final String title;
    private final String content;
    private final String imageLink;
    private final LocalDateTime modifyAt;
    private final LocalDateTime createAt;
    private final Boolean productLike;

    private final Integer price;
    private final Integer view;
    private final Integer conditionValue;


    @Builder
    @QueryProjection
    public ProductWithLikedResponse(Long productId, Long memberId, String category, String name, String title, String content, String imageLink,
                                    LocalDateTime modifyAt, LocalDateTime createAt, Boolean productLike, Integer price, Integer view, Integer conditionValue){
        this.productId = productId;
        this.memberId = memberId;
        this.category = category;
        this.name = name;
        this.title = title;
        this.content = content;
        this.imageLink = imageLink;
        this.modifyAt = modifyAt;
        this.createAt = createAt;
        this.productLike = productLike;
        this.price = price;
        this.view = view;
        this.conditionValue = conditionValue;
    }



    public static ProductWithLikedResponse of(Product product, Long findMemberId){
        return new ProductWithLikedResponse(product.getProductId(),product.getMember().getMemberId(),product.getCategory(),product.getName(),
                product.getTitle(),product.getContent(),product.getImageLink(),product.getModifyAt(),product.getCreateAt(),
                product.isLikedByMember(findMemberId), product.getPrice(),product.getView(),product.getConditionValue());
    }

    public static ProductWithLikedResponse of(Product product){
        return new ProductWithLikedResponse(product.getProductId(),product.getMember().getMemberId(),product.getCategory(),product.getName(),
                product.getTitle(),product.getContent(),product.getImageLink(),product.getModifyAt(),product.getCreateAt(),
                false, product.getPrice(),product.getView(),product.getConditionValue());
    }

}
