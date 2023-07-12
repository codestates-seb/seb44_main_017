package com.main.project.order.repository;

import com.main.project.dto.queryget;
import com.main.project.member.entity.Member;
import com.main.project.order.entity.Orderproduct;
import com.main.project.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface OrderproductRepository extends JpaRepository<Orderproduct, Long> {

    @Query(value = "select o.orderproduct_id,o.product_id,o.member_id from orderproduct o where o.member_id=:MID and o.product_id=:PID",nativeQuery = true)
    List<queryget.orderproduct> findOrderproduct(@Param("MID") Long MID,@Param("PID") Long PID);


    @Query(value = "select o.orderproduct_id from orderproduct o where o.member_id!=:MID and o.product_id=:PID",nativeQuery = true)
    List<queryget.findbyorderpid> findOrderproductdelete(@Param("MID") Long MID,@Param("PID") Long PID);



    @Query(value = "select * from orderproduct o where o.member_id=:MID and o.product_id=:PID",nativeQuery = true)
    Optional<Orderproduct> findOrderproductsig(@Param("MID") Long MID, @Param("PID") Long PID);

    @Query(value = "select P.product_id from orderproduct o join product p on o.product_id = p.product_id where o.member_id=:ID and issell=false", nativeQuery = true)
    List<queryget.findbypid> findAllByMemberId(@Param("ID") Long ID);

    @Query(value = "select P.product_id,P.member_id,P.name,P.price,P.issell from orderproduct o join product p on o.product_id = p.product_id where o.member_id=:ID and issell=false",nativeQuery = true)
    List<queryget.orderproductlist> getorderproductlist(@Param("ID") Long ID);

    @Query(value = "select P.product_id,P.member_id,P.category,P.name,P.title,P.content,P.image_link,P.modify_at,P.create_at,P.price,P.productlike,P.view,P.condition_value from product p natural join orderproduct o where p.product_id = o.product_id and p.member_id=:ID and issell=:issell order by create_at asc",nativeQuery = true)
    Page<queryget.product> getorderproductold(@Param("ID") Long ID, @Param(value= "issell") boolean issell, Pageable pageable);

    @Query(value = "select P.product_id,P.member_id,P.category,P.name,P.title,P.content,P.image_link,P.modify_at,P.create_at,P.price,P.productlike,P.view,P.condition_value from product p natural join orderproduct o where p.product_id = o.product_id and p.member_id=:ID and issell=:issell order by view asc",nativeQuery = true)
    Page<queryget.product> getorderproductview(@Param("ID") Long ID, @Param(value= "issell") boolean issell, Pageable pageable);

    @Query(value = "select P.product_id,P.member_id,P.category,P.name,P.title,P.content,P.image_link,P.modify_at,P.create_at,P.price,P.productlike,P.view,P.condition_value from product p natural join orderproduct o where p.product_id = o.product_id and p.member_id=:ID and issell=:issell order by price desc",nativeQuery = true)
    Page<queryget.product> getorderproductpricedesc(@Param("ID") Long ID, @Param(value= "issell") boolean issell, Pageable pageable);

    @Query(value = "select P.product_id,P.member_id,P.category,P.name,P.title,P.content,P.image_link,P.modify_at,P.create_at,P.price,P.productlike,P.view,P.condition_value from product p natural join orderproduct o where p.product_id = o.product_id and p.member_id=:ID and issell=:issell order by price asc",nativeQuery = true)
    Page<queryget.product> getorderproductpriceasc(@Param("ID") Long ID, @Param(value= "issell") boolean issell, Pageable pageable);

    @Query(value = "select P.product_id,P.member_id,P.category,P.name,P.title,P.content,P.image_link,P.modify_at,P.create_at,P.price,P.productlike,P.view,P.condition_value from product p natural join orderproduct o where p.product_id = o.product_id and p.member_id=:ID and issell=:issell order by create_at desc",nativeQuery = true)
    Page<queryget.product> getorderproductnew(@Param("ID") Long ID, @Param(value= "issell") boolean issell, Pageable pageable);

    @Query(value = "select P.product_id,P.member_id,P.category,P.name,P.title,P.content,P.image_link,P.modify_at,P.create_at,P.price,P.productlike,P.view,P.condition_value from product p natural join orderproduct o where p.product_id = o.product_id and p.member_id=:ID and issell=:issell order by productlike asc",nativeQuery = true)
    Page<queryget.product> getorderproductlike(@Param("ID") Long ID, @Param(value= "issell") boolean issell, Pageable pageable);
}
