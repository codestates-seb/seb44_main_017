package com.main.project.questionComment.repository;

import com.main.project.questionComment.entity.QComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QCommentRepository extends JpaRepository<QComment,Long> {
}
