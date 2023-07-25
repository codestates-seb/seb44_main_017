package com.main.project.notifyView.repository;

import com.main.project.notifyView.entity.NotifyView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface NotifyViewRepository extends JpaRepository<NotifyView,Long> {

    @Query(value = "select * from notify_view v where v.member_id = :memberId AND v.board_id = :boardId",nativeQuery = true)
    Optional<NotifyView> findByMemberIdAndBoardId(Long memberId,Long boardId);

    @Transactional
    @Modifying
    @Query(value = "delete from notify_view n where n.board_id = :boardId",nativeQuery = true)
    void deleteAllByIdInQuery(@Param("boardId") Long boardId);

    @Transactional
    @Modifying
    @Query(value = "delete from notify_view n where n.member_id = :memberId",nativeQuery = true)
    void deleteAllByMemberIdInQuery(@Param("memberId") Long memberId);
}
