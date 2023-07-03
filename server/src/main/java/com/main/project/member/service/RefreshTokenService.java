package com.main.project.member.service;

import com.main.project.member.entity.RefreshToken;
import com.main.project.member.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class RefreshTokenService {
    private final RefreshTokenRepository refreshTokenRepository;

    @Transactional
    public RefreshToken addRefreshToken(RefreshToken refreshToken) {
        return refreshTokenRepository.save(refreshToken);
    }
    public RefreshToken findtok(String val) {
        Optional<RefreshToken> optionalRefreshToken = refreshTokenRepository.findByValue(val);
        RefreshToken RT = optionalRefreshToken.get();
        return RT;
    }

    public void deleteRefreshToken(String refreshToken) {
        RefreshToken refreshToken1 = findtok(refreshToken);
        refreshTokenRepository.delete(refreshToken1);
    }

    @Transactional
    public Optional<RefreshToken> findRefreshToken(String refreshToken) {
        return refreshTokenRepository.findByValue(refreshToken);
    }
}
