package com.main.project.questionBorad.repository;

import com.main.project.questionBorad.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question,Long> {
}
