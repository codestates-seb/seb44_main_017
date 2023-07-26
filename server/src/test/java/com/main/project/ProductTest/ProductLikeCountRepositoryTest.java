package com.main.project.ProductTest;


import com.main.project.admin.entity.Admin;
import com.main.project.member.entity.Member;
import com.main.project.product.controller.dto.ProductDto;
import com.main.project.product.entity.Product;
import com.main.project.product.entity.ProductLikeCount;
import com.main.project.product.entity.Productdeny;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;


@DataJpaTest
public class ProductLikeCountRepositoryTest {
    @Test
    public void existsByProductTest(){

    }

    @Test
    public void findByProductTest(){
        Member member = new Member();
        member.setMemberId(1L);

        Admin admin = new Admin();
        admin.setAdminId(1L);

        ProductLikeCount likeCount = new ProductLikeCount();
        Productdeny deny = new Productdeny();
        Product product = new Product();
//                new Product(
//                1L, member, admin, "Shirts", "secondhand Shirts", "cool hawaiian shirt",
//                70000, "top", 0,"example.com", false, 10, 700, 0, new ArrayList<>(), new ArrayList<>(),
//                new ArrayList<>(), deny, new ArrayList<>(), likeCount);


    }

    @Test
    public void findByProductProductIdTest(){

    }

    @Test
    public void getLikeCountByProductProductId(){

    }
}
