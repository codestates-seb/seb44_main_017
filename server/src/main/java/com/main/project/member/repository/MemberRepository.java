package com.main.project.member.repository;

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

    @Query(value = "select P.product_id,P.category,P.name,P.title,P.content,P.image_link,P.modify_at,P.create_at,P.price,P.productlike,P.view,P.condition_value from member m join product P ON m.member_id = P.member_id where P.issell = true and M.member_id=:ID", nativeQuery = true)
    List<MemberDto.product> findUser(@Param(value = "ID") String ID);

}
