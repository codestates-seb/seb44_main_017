package com.main.project.productComment.repository;

import com.main.project.productComment.ProductComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductCommentRepository extends JpaRepository<ProductComment, Long> {
}
