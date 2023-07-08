package com.main.project.member.service;

import com.main.project.exception.businessLogicException.BusinessLogicException;
import com.main.project.exception.businessLogicException.ExceptionCode;
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
    public RefreshToken findRefreshToken(String refreshToken) {
        RefreshToken token = refreshTokenRepository.findByValue(refreshToken)
                .orElseThrow(()->new BusinessLogicException(ExceptionCode.REFRESH_NOT_FOUND));

        return token;
    }

    //멤버이면 true 반환 관리자면 false 반환
    public boolean MemberBool(String refreshToken){
        RefreshToken token = findRefreshToken(refreshToken);
        if(token.getAdminId()==null){
            return true;
        }else {
            return false;
        }
    }
}
