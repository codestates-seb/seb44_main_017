package com.main.project.questionView.repository;

import com.main.project.questionView.entity.QuestionView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface QuestionViewRepository extends JpaRepository<QuestionView,Long> {

    @Query(value = "select * from question_view v where v.member_id = :memberId AND v.question_id = :questionId",nativeQuery = true)
    Optional<QuestionView> findByMemberIdAndQuestionId(Long memberId,Long questionId);

    @Transactional
    @Modifying
    @Query(value = "delete from question_view v where v.question_id = :questionId",nativeQuery = true)
    void deleteAllByIdInQuery(@Param("questionId") Long questionId);

    @Transactional
    @Modifying
    @Query(value = "delete from question_view v where v.member_id = :memberId",nativeQuery = true)
    void deleteAllByMemberIdInQuery(@Param("memberId") Long memberId);
}
