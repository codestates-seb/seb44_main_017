package com.main.project.product.repository;

import com.main.project.dto.queryresponse.ProductWithLikedResponse;
import com.main.project.dto.queryresponse.ProductWithLikedResponse;
import com.main.project.dto.queryresponse.QProductResponse;
import com.main.project.dto.queryresponse.QProductWithLikedResponse;
import com.main.project.exception.businessLogicException.BusinessLogicException;
import com.main.project.exception.businessLogicException.ExceptionCode;
import com.main.project.member.entity.Member;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.amazonaws.services.cloudformation.model.Replacement.False;
import static com.main.project.product.entity.QProduct.product;

@Repository
@RequiredArgsConstructor
public class ProductQueryRepository {
    private final JPAQueryFactory jpaQueryFactory;

    public Page<ProductWithLikedResponse> getProducts(Pageable pageable, String keyword){
        OrderSpecifier orderSpecifiers = createOrderSpecifier(keyword);
        List<ProductWithLikedResponse> responses = jpaQueryFactory
                .select(new QProductWithLikedResponse(
                        product.productId,
                        product.member.memberId,
                        product.category,
                        product.name,
                        product.title,
                        product.content,
                        product.imageLink,
                        product.modifyAt,
                        product.createAt,
                        product.likedByMembers.contains(new Member()),
                        product.price,
                        product.view,
                        product.conditionValue)
                )
                .from(product)
                .where(product.price.ne(0),
                        product.price.isNotNull())
                .orderBy(orderSpecifiers)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long count = jpaQueryFactory
                .select(product.count())
                .from(product)
                .fetchOne();

        return new PageImpl<>(responses,pageable,count);
    }

    public Page<ProductWithLikedResponse> getProducts(Pageable pageable, String keyword, Member findMember){
        OrderSpecifier orderSpecifiers = createOrderSpecifier(keyword);
        List<ProductWithLikedResponse> responses = jpaQueryFactory
                .select(new QProductWithLikedResponse(
                        product.productId,
                        product.member.memberId,
                        product.category,
                        product.name,
                        product.title,
                        product.content,
                        product.imageLink,
                        product.modifyAt,
                        product.createAt,
                        product.likedByMembers.contains(findMember),
                        product.price,
                        product.view,
                        product.conditionValue)
                )
                .from(product)
                .where(product.price.ne(0),
                        product.price.isNotNull())
                .orderBy(orderSpecifiers)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long count = jpaQueryFactory
                .select(product.count())
                .from(product)
                .fetchOne();

        return new PageImpl<>(responses,pageable,count);
    }

    public Page<ProductWithLikedResponse> getProducts(Pageable pageable, String keyword, boolean issell){
        OrderSpecifier orderSpecifiers = createOrderSpecifier(keyword);
        List<ProductWithLikedResponse> responses = jpaQueryFactory
                .select(new QProductWithLikedResponse(
                        product.productId,
                        product.member.memberId,
                        product.category,
                        product.name,
                        product.title,
                        product.content,
                        product.imageLink,
                        product.modifyAt,
                        product.createAt,
                        product.likedByMembers.contains(new Member()),
                        product.price,
                        product.view,
                        product.conditionValue)
                )
                .from(product)
                .where(product.issell.eq(issell),
                        product.price.ne(0),
                        product.price.isNotNull())
                .orderBy(orderSpecifiers)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long count = jpaQueryFactory
                .select(product.count())
                .from(product)
                .where(product.issell.eq(issell))
                .fetchOne();

        return new PageImpl<>(responses,pageable,count);
    }

    public Page<ProductWithLikedResponse> getProducts(Pageable pageable, String keyword,
                                                      boolean issell, Member findMember){
        OrderSpecifier orderSpecifiers = createOrderSpecifier(keyword);
        List<ProductWithLikedResponse> responses = jpaQueryFactory
                .select(new QProductWithLikedResponse(
                        product.productId,
                        product.member.memberId,
                        product.category,
                        product.name,
                        product.title,
                        product.content,
                        product.imageLink,
                        product.modifyAt,
                        product.createAt,
                        product.likedByMembers.contains(findMember),
                        product.price,
                        product.view,
                        product.conditionValue)
                )
                .from(product)
                .where(product.issell.eq(issell),
                        product.price.ne(0),
                        product.price.isNotNull())
                .orderBy(orderSpecifiers)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long count = jpaQueryFactory
                .select(product.count())
                .from(product)
                .where(product.issell.eq(issell))
                .fetchOne();

        return new PageImpl<>(responses,pageable,count);
    }

    private OrderSpecifier createOrderSpecifier(String keyword) {

        OrderSpecifier orderSpecifiers;

        switch (keyword){
            case "newest":
                orderSpecifiers = new OrderSpecifier(Order.DESC, product.createAt);
                break;
            case "oldest":
                orderSpecifiers = new OrderSpecifier(Order.ASC, product.createAt);
                break;
            case "mostlike":
                orderSpecifiers = new OrderSpecifier(Order.DESC, product.productlike);
                break;
            case "pricedesc":
                orderSpecifiers = new OrderSpecifier(Order.DESC, product.price);
                break;
            case "priceasc":
                orderSpecifiers = new OrderSpecifier(Order.ASC, product.price);
                break;
            default:
                orderSpecifiers = new OrderSpecifier(Order.DESC, product.createAt);
        }

        return orderSpecifiers;
    }
}
