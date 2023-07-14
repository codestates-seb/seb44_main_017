package com.main.project.order.repository;

import com.main.project.dto.queryget;
import com.main.project.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    //@Query(value = "select o.order_id from orders o where needapprove is true", nativeQuery = true)
    //List<queryget.findbyorderid> findByNeedapprove();

    @Query(value = "select o.order_id from orders o where o.tid=:ID", nativeQuery = true)
    queryget.findbyorderid findByTid(@Param("ID") String ID);

}
