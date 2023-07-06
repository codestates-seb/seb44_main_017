package com.main.project.product.repository;

import com.main.project.dto.queryget;
import com.main.project.product.dto.ProductDto;
import com.main.project.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query(value = "select product_id,member_id,category,name,title,content,image_link,modify_at,create_at,price,view,condition_value from product where issell=:issell",nativeQuery = true)
    Page<queryget.product> findByIssell(Boolean issell, PageRequest of);
}
