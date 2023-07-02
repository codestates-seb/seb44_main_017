package com.main.project.notifyBoard.repository;

import com.main.project.notifyBoard.entity.NotifyBoard;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotifyRepository extends JpaRepository<NotifyBoard,Long> {
}
