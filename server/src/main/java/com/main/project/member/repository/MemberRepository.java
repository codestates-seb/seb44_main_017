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

    @Query(value = "select P.product_id,P.member_id,P.category,P.name,P.title,P.content,P.image_link,P.modify_at,P.create_at,P.price,P.productlike,P.view,P.condition_value from member m join product P ON m.member_id = P.member_id where P.issell=:issell and m.member_id=:ID order by P.create_at desc", nativeQuery = true)
    Page<queryget.product> findUserProductNew(@Param(value = "ID") Long ID, @Param(value= "issell") boolean issell, Pageable pageable);
    @Query(value = "select P.product_id,P.member_id,P.category,P.name,P.title,P.content,P.image_link,P.modify_at,P.create_at,P.price,P.productlike,P.view,P.condition_value from member m join product P ON m.member_id = P.member_id where P.issell=:issell and m.member_id=:ID order by P.create_at asc", nativeQuery = true)
    Page<queryget.product> findUserProductOld(@Param(value = "ID") Long ID, @Param(value= "issell") boolean issell, Pageable pageable);

    @Query(value = "select P.product_id,P.member_id,P.category,P.name,P.title,P.content,P.image_link,P.modify_at,P.create_at,P.price,P.productlike,P.view,P.condition_value from member m join product P ON m.member_id = P.member_id where P.issell=:issell and m.member_id=:ID order by P.price desc", nativeQuery = true)
    Page<queryget.product> findUserProductpricedesc(@Param(value = "ID") Long ID, @Param(value= "issell") boolean issell, Pageable pageable);

    @Query(value = "select P.product_id,P.member_id,P.category,P.name,P.title,P.content,P.image_link,P.modify_at,P.create_at,P.price,P.productlike,P.view,P.condition_value from member m join product P ON m.member_id = P.member_id where P.issell=:issell and m.member_id=:ID order by P.price asc", nativeQuery = true)
    Page<queryget.product> findUserProductpriceasc(@Param(value = "ID") Long ID, @Param(value= "issell") boolean issell, Pageable pageable);

    //@Query(value = "select P.product_id,(select count(*) from productlike where product_id = P.product_id) as likecount, P.category,P.name,P.title,P.content,P.image_link,P.modify_at,P.create_at,P.price,P.productlike,P.view,P.condition_value from member m join product P ON m.member_id = P.member_id where P.issell = true and m.member_id=:ID order by likecount desc", nativeQuery = true)
    //Page<MemberDto.product> findUserProductLike(@Param(value = "ID") Long ID, Pageable pageable);
    @Query(value = "select P.product_id,P.member_id,P.category,P.name,P.title,P.content,P.image_link,P.modify_at,P.create_at,P.price,P.productlike,P.view,P.condition_value from member m join product P ON m.member_id = P.member_id where P.issell = true and m.member_id=:ID order by P.view desc", nativeQuery = true)
    Page<queryget.product> findUserProductView(@Param(value = "ID") Long ID, Pageable pageable);

    @Query(value = "select P.product_id,P.member_id,P.category,P.name,P.title,P.content,P.image_link,P.modify_at,P.create_at,P.price,P.productlike,P.view,P.condition_value from member m join product P ON m.member_id = P.member_id where P.price is null and m.member_id=:ID order by P.product_id desc", nativeQuery = true)
    Page<queryget.product> findUserProductwait(@Param(value = "ID") Long ID, Pageable pageable);

    @Query(value = "select Q.question_id,P.member_id,Q.view,Q.title,Q.content,Q.create_at,Q.modify_at from member M join question Q ON M.member_id = Q.member_id where M.member_id=:ID", nativeQuery = true)
    Page<queryget.question> findUserQuestion(@Param(value = "ID") Long ID, Pageable pageable);
}
