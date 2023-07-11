package com.main.project.productComment.repository;

import com.main.project.productComment.ProductComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductCommentRepository extends JpaRepository<ProductComment, Long> {

    List<ProductComment> findByProductProductId(Long productId);
}
