package com.main.project.product.repository;

import com.main.project.product.entity.Product;
import com.main.project.product.entity.Productdeny;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ProductdenyRepository extends JpaRepository<Productdeny, Long> {

    boolean existsByProduct(Product product);
    Optional<Productdeny> findByProduct(Product product);
}