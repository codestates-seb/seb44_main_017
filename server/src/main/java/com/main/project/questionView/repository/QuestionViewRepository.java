package com.main.project.questionView.repository;

import com.main.project.notifyView.entity.NotifyView;
import com.main.project.questionView.entity.QuestionView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface QuestionViewRepository extends JpaRepository<QuestionView,Long> {

    @Query(value = "select * from question_view v where v.member_id = :memberId AND v.question_id = :questionId",nativeQuery = true)
    Optional<NotifyView> findByMemberIdAndQuestionId(Long memberId,Long questionId);
}
