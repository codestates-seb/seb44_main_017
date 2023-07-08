package com.main.project.notifyView.repository;

import com.main.project.notifyView.entity.NotifyView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface NotifyViewRepository extends JpaRepository<NotifyView,Long> {

    @Query(value = "select * from notify_view v where v.member_id = :memberId",nativeQuery = true)
    Optional<NotifyView> findByMemberId(Long memberId);
}
