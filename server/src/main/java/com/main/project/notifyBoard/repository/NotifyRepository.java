package com.main.project.notifyBoard.repository;

import com.main.project.notifyBoard.entity.NotifyBoard;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface NotifyRepository extends JpaRepository<NotifyBoard,Long> {

    @Query(value = "select Min(board_id) from notify_board b where b.board_id > :boardId",nativeQuery = true)
    Optional<Long>findByBoardIdGreaterThan(Long boardId);

    @Query(value = "select Max(board_id) from notify_board b where b.board_id < :boardId",nativeQuery = true)
    Optional<Long>findByBoardIdLessThan(Long boardId);
}
