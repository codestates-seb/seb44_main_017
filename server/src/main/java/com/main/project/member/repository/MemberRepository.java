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
    @Query(value = "select Q.question_id,Q.member_id,Q.view,Q.title,Q.content,Q.create_at,Q.modify_at from question Q where Q.member_id=:ID", nativeQuery = true)
    Page<queryget.question> findUserQuestion(@Param(value = "ID") Long ID, Pageable pageable);

}
