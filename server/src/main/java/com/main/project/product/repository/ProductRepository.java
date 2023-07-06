package com.main.project.product.repository;

import com.main.project.product.dto.ProductDto;
import com.main.project.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<ProductDto.Response> findByIssell(Boolean issell, PageRequest of);
}
