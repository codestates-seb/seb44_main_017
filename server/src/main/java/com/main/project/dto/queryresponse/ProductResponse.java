package com.main.project.dto.queryresponse;

import com.main.project.product.entity.Product;
import com.querydsl.core.annotations.QueryProjection;
import com.querydsl.core.types.dsl.DateTimePath;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.core.types.dsl.StringPath;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ProductResponse {
    private final Long productId;
    private final Long memberId;
    private final String category;
    private final String name;
    private final String title;
    private final String content;
    private final String imageLink;
    private final LocalDateTime modifyAt;
    private final LocalDateTime createAt;
    private final Integer productlike;
    private final Integer price;
    private final Integer view;
    private final Integer conditionValue;

    @Builder
    @QueryProjection
    public ProductResponse(Long productId, Long memberId, String category, String name, String title, String content, String imageLink,
                           LocalDateTime modifyAt, LocalDateTime createAt, Integer productlike, Integer price, Integer view, Integer conditionValue){
        this.productId = productId;
        this.memberId = memberId;
        this.category = category;
        this.name = name;
        this.title = title;
        this.content = content;
        this.imageLink = imageLink;
        this.modifyAt = modifyAt;
        this.createAt = createAt;
        this.productlike = productlike;
        this.price = price;
        this.view = view;
        this.conditionValue = conditionValue;
    }



    public static ProductResponse of(Product product){
        return new ProductResponse(product.getProductId(),product.getMember().getMemberId(),product.getCategory(),product.getName(),
                product.getTitle(),product.getContent(),product.getImageLink(),product.getModifyAt(),product.getCreateAt(),
                product.getProductlike(),product.getPrice(),product.getView(),product.getConditionValue());
    }

}
