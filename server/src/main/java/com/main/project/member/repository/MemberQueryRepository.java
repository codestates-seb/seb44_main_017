package com.main.project.member.repository;


import static com.main.project.dto.queryresponse.ProductResponse.*;
import static com.main.project.questionBorad.entity.QQuestion.question;
import static com.main.project.product.entity.QProduct.product;
import static com.main.project.product.entity.QProductdeny.productdeny;

import com.main.project.dto.queryresponse.ProductResponse;
import com.main.project.dto.queryresponse.QProductResponse;
import com.main.project.dto.queryresponse.QuestionResponse;
import com.main.project.dto.queryresponse.*;
import com.main.project.product.entity.Product;
import com.main.project.product.entity.QProduct;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class MemberQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public Page<QuestionResponse> getMemberQuestions(Long ID, Pageable pageable){
        List<QuestionResponse> responses = jpaQueryFactory
                .select(new QQuestionResponse(
                        question.questionId,
                        question.view,
                        question.title,
                        question.content,
                        question.createAt,
                        question.modifyAt)
                )
                .from(question)
                .where(question.writer.memberId.eq(ID))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
        Long count = jpaQueryFactory
                .select(question.count())
                .from(question)
                .where(question.writer.memberId.eq(ID))
                .fetchOne();
        return new PageImpl<>(responses,pageable,count);

    }

    public  Page<ProductResponse> getMemberProductdeny(Long ID, Pageable pageable){
        List<ProductResponse> responses = jpaQueryFactory
                .select(new QProductResponse(
                        product.productId,
                        product.member.memberId,
                        product.category,
                        product.name,
                        product.title,
                        product.content,
                        product.imageLink,
                        product.modifyAt,
                        product.createAt,
                        product.productlike,
                        product.price,
                        product.view,
                        product.conditionValue)
                )
                .from(product)
                .join(product.productdeny, productdeny).on(product.productId.eq(productdeny.product.productId))
                .where(product.price.eq(0),
                        product.member.memberId.eq(ID))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
        Long count = jpaQueryFactory
                .select(product.count())
                .from(product)
                .join(product.productdeny, productdeny).on(product.productId.eq(productdeny.product.productId))
                .where(product.price.eq(0),
                        product.member.memberId.eq(ID))
                .fetchOne();
        return new PageImpl<>(responses,pageable,count);
    }
    public Page<ProductResponse> getMemberProductwait(Long ID, Pageable pageable){
        List<ProductResponse> responses = jpaQueryFactory
                .select(new QProductResponse(
                        product.productId,
                        product.member.memberId,
                        product.category,
                        product.name,
                        product.title,
                        product.content,
                        product.imageLink,
                        product.modifyAt,
                        product.createAt,
                        product.productlike,
                        product.price,
                        product.view,
                        product.conditionValue)
                )
                .from(product)
                .where(product.admin.adminId.isNull(),
                        product.price.eq(0),
                        product.member.memberId.eq(ID))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
        Long count = jpaQueryFactory
                .select(product.count())
                .from(product)
                .where(product.admin.adminId.isNull(),
                        product.price.eq(0),
                        product.member.memberId.eq(ID))
                .fetchOne();
        return new PageImpl<>(responses,pageable,count);
    }

    public Page<ProductResponse> getMemberProduct(Long ID, Pageable pageable, String keyword, boolean issell){
        OrderSpecifier orderSpecifiers = createOrderSpecifier(keyword);
        List<ProductResponse> responses = jpaQueryFactory
                .select(new QProductResponse(
                        product.productId,
                        product.member.memberId,
                        product.category,
                        product.name,
                        product.title,
                        product.content,
                        product.imageLink,
                        product.modifyAt,
                        product.createAt,
                        product.productlike,
                        product.price,
                        product.view,
                        product.conditionValue)
                )
                .from(product)
                .where(product.member.memberId.eq(ID),
                        product.issell.eq(issell),
                        product.price.ne(0),
                        product.price.isNotNull())
                .orderBy(orderSpecifiers)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
        Long count = jpaQueryFactory
                .select(product.count())
                .from(product)
                .where(product.member.memberId.eq(ID),
                        product.issell.eq(issell))
                .fetchOne();
        return new PageImpl<>(responses,pageable,count);
    }

    private OrderSpecifier createOrderSpecifier(String keyword) {

        OrderSpecifier orderSpecifiers;

        if(keyword == null){
            orderSpecifiers = new OrderSpecifier(Order.DESC, product.createAt);
        }else if(keyword.equals("oldest")){
            orderSpecifiers = new OrderSpecifier(Order.ASC, product.createAt);
        }else if(keyword.equals("mostlike")){
            orderSpecifiers = new OrderSpecifier(Order.DESC, product.productlike);
        }else if(keyword.equals("mostview")){
            orderSpecifiers = new OrderSpecifier(Order.DESC, product.view);
        }else if(keyword.equals("pricedesc")){
            orderSpecifiers = new OrderSpecifier(Order.DESC, product.price);
        }else if(keyword.equals("priceasc")){
            orderSpecifiers = new OrderSpecifier(Order.ASC, product.price);
        }else{
            orderSpecifiers = new OrderSpecifier(Order.DESC, product.createAt);
        }
        return orderSpecifiers;
    }
}
