package com.main.project.product.repository;

import com.main.project.product.entity.Product;
import com.main.project.product.entity.ProductLikeCount;
import com.main.project.product.entity.Productdeny;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductLikeCountRepository extends JpaRepository<ProductLikeCount, Long> {
    boolean existsByProduct(Product product);

    Optional<ProductLikeCount> findByProduct(Product product);

    Optional<ProductLikeCount> findByProductProductId(Long productId);
}
