package com.main.project.admin.repository;

import com.main.project.admin.entity.Admin;
import com.main.project.dto.queryget;
import com.main.project.member.dto.MemberDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByEmail(String email);

    @Query(value = "select p.product_id,p.member_id,p.category,p.name,p.title,p.content,p.image_link,p.modify_at,p.create_at,p.price,p.productlike,p.view,p.condition_value from product p left outer join productdeny d on(p.product_id = d.product_id) where p.price is null and d.product_id is null order by p.create_at desc", nativeQuery = true)
    Page<queryget.product> findProductdescwait(Pageable pageable);
    @Query(value = "select p.product_id,p.member_id,p.category,p.name,p.title,p.content,p.image_link,p.modify_at,p.create_at,p.price,p.productlike,p.view,p.condition_value from product p left outer join productdeny d on(p.product_id = d.product_id) where p.price is null and d.product_id is null order by p.create_at asc", nativeQuery = true)
    Page<queryget.product> findProductascwait(Pageable pageable);

    @Query(value = "select P.product_id,P.member_id,P.category,P.name,P.title,P.content,P.image_link,P.modify_at,P.create_at,P.price,P.productlike,P.view,P.condition_value from admin a join product P ON a.admin_id = P.admin_id where P.issell=:issell and a.admin_id=:ID order by P.create_at desc", nativeQuery = true)
    Page<queryget.product> findAdminProductNew(@Param(value = "ID") Long ID, @Param(value= "issell") boolean issell, Pageable pageable);
    @Query(value = "select P.product_id,P.member_id,P.category,P.name,P.title,P.content,P.image_link,P.modify_at,P.create_at,P.price,P.productlike,P.view,P.condition_value from admin a join product P ON a.admin_id = P.admin_id where P.issell=:issell and a.admin_id=:ID order by P.create_at asc", nativeQuery = true)
    Page<queryget.product> findAdminProductOld(@Param(value = "ID") Long ID, @Param(value= "issell") boolean issell, Pageable pageable);

    @Query(value = "select P.product_id,P.member_id,P.category,P.name,P.title,P.content,P.image_link,P.modify_at,P.create_at,P.price,P.productlike,P.view,P.condition_value from admin a join product P ON a.admin_id = P.admin_id where P.issell=:issell and a.admin_id=:ID order by P.price desc", nativeQuery = true)
    Page<queryget.product> findAdminProductpricedesc(@Param(value = "ID") Long ID, @Param(value= "issell") boolean issell, Pageable pageable);

    @Query(value = "select P.product_id,P.member_id,P.category,P.name,P.title,P.content,P.image_link,P.modify_at,P.create_at,P.price,P.productlike,P.view,P.condition_value from admin a join product P ON a.admin_id = P.admin_id where P.issell=:issell and a.admin_id=:ID order by P.price asc", nativeQuery = true)
    Page<queryget.product> findAdminProductpriceasc(@Param(value = "ID") Long ID, @Param(value= "issell") boolean issell, Pageable pageable);

    @Query(value = "select P.product_id,P.member_id,P.category,P.name,P.title,P.content,P.image_link,P.modify_at,P.create_at,P.price,P.productlike,P.view,P.condition_value from admin a join product P ON a.admin_id = P.admin_id where P.issell = true and a.admin_id=:ID order by P.view desc", nativeQuery = true)
    Page<queryget.product> findAdminProductView(@Param(value = "ID") Long ID, Pageable pageable);

}
