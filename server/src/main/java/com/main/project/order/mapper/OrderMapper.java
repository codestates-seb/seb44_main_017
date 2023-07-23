package com.main.project.order.mapper;

import com.main.project.member.dto.MemberDto;
import com.main.project.member.entity.Member;
import com.main.project.order.dto.OrderDto;
import com.main.project.order.entity.Order;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    Order orderPostToOrder(OrderDto.Post requestBody);
    Order orderPostbucketToOrder(OrderDto.Postbucket requestBody);
}
