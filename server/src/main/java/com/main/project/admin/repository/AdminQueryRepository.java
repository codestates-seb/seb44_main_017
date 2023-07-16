package com.main.project.admin.repository;

import com.main.project.dto.queryresponse.ProductResponse;
import com.main.project.dto.queryresponse.QProductResponse;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.main.project.product.entity.QProduct.product;

@Repository
@RequiredArgsConstructor
public class AdminQueryRepository {
    private final JPAQueryFactory jpaQueryFactory;

    public  Page<ProductResponse> getAdminProductwait(Pageable pageable, String keyword){
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
                .where(product.admin.adminId.isNull(),
                        product.price.eq(0))
                .orderBy(orderSpecifiers)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
        Long count = jpaQueryFactory
                .select(product.count())
                .from(product)
                .where(product.admin.adminId.isNull(),
                        product.price.eq(0))
                .fetchOne();
        return new PageImpl<>(responses,pageable,count);
    }
    public Page<ProductResponse> getAdminProduct(Long ID, Pageable pageable, String keyword, boolean issell){
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
                .where(product.admin.adminId.eq(ID),
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
                .where(product.admin.adminId.eq(ID),
                        product.issell.eq(issell),
                        product.price.ne(0),
                        product.price.isNotNull())
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
