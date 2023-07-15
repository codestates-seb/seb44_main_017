package com.main.project.member.repository;

import com.main.project.dto.queryget;
import com.main.project.member.dto.MemberDto;
import com.main.project.member.entity.Member;
import com.main.project.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);
    boolean existsByName(String name);

    Page<Member> findByNameContaining(String keyword, Pageable pageable);

    @Query(value = "select P.product_id,P.member_id,P.category,P.name,P.title,P.content,P.image_link,P.modify_at,P.create_at,P.price,P.productlike,P.view,P.condition_value from  product P left outer join productdeny d on(p.product_id = d.product_id) where P.price is null and d.product_id is null and p.member_id=:ID order by P.product_id desc", nativeQuery = true)
    Page<queryget.product> findUserProductwait(@Param(value = "ID") Long ID, Pageable pageable);

    @Query(value = "select Q.question_id,Q.member_id,Q.view,Q.title,Q.content,Q.create_at,Q.modify_at from question Q where Q.member_id=:ID", nativeQuery = true)
    Page<queryget.question> findUserQuestion(@Param(value = "ID") Long ID, Pageable pageable);

    @Query(value = "select P.product_id,P.member_id,P.category,P.name,P.title,P.content,P.image_link,P.modify_at,P.create_at,d.denycontent from product p join productdeny d where price is null and p.product_id = d.product_id and p.member_id=:ID",nativeQuery = true)
    Page<queryget.denyproduct> findUserProductdeny(@Param(value = "ID") Long ID, Pageable pageable);
}
