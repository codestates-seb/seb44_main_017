package com.main.project.order.service;

import com.main.project.member.entity.Member;
import com.main.project.order.entity.Order;
import com.main.project.order.repository.OrderRepository;
import com.main.project.product.entity.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    public Order createOrder(Order order, Member member, int sum, Long productId){

        order.setMember(member);
        order.setCreate_at(LocalDateTime.now());
        order.setMoneycount(sum);
        order.setSingleorder(productId);
        return orderRepository.save(order);
    }
}
