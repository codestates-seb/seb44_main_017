package com.main.project.member.repository;

import com.main.project.member.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByValue(String value);

    boolean existsByMemberId(Long memberId);
    boolean existsByAdminId(Long adminId);

    Optional<RefreshToken> findByMemberId(Long memberId);
    Optional<RefreshToken> findByAdminId(Long adminId);
}
