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

    @Query(value = "select p.product_id from orderproduct o join product p on o.product_id = p.product_id where o.member_id=:ID and issell=false", nativeQuery = true)
    List<queryget.findbypid> findAllByMemberId(@Param("ID") Long ID);

    @Query(value = "select p.product_id,p.member_id,p.name,p.price,p.issell from orderproduct o join product p on o.product_id = p.product_id where o.member_id=:ID and issell=false",nativeQuery = true)
    List<queryget.orderproductlist> getorderproductlist(@Param("ID") Long ID);

}
