package com.main.project.auth.handler;

import com.main.project.auth.jwt.JwtTokenizer;
import com.main.project.auth.userinfo.GoogleUserInfo;
import com.main.project.auth.userinfo.KakaoUserInfo;
import com.main.project.auth.userinfo.OAuth2UserInfo;
import com.main.project.auth.util.UserCustomAuthorityUtils;
import com.main.project.exception.businessLogicException.BusinessLogicException;
import com.main.project.exception.businessLogicException.ExceptionCode;
import com.main.project.member.entity.Member;
import com.main.project.member.entity.RefreshToken;
import com.main.project.member.repository.RefreshTokenRepository;
import com.main.project.member.service.MemberService;
import com.main.project.member.service.RefreshTokenService;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.*;

public class OAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;
    private final UserCustomAuthorityUtils authorityUtils;
    private final MemberService memberService;
    private final RefreshTokenRepository refreshTokenRepository;
    private final RefreshTokenService refreshTokenService;

    public OAuth2MemberSuccessHandler (JwtTokenizer jwtTokenizer, UserCustomAuthorityUtils authorityUtils, MemberService memberService, RefreshTokenRepository refreshTokenRepository, RefreshTokenService refreshTokenService){
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.memberService = memberService;
        this.refreshTokenRepository = refreshTokenRepository;
        this.refreshTokenService = refreshTokenService;
    }


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        var oAuth2User = (OAuth2User)authentication.getPrincipal();
        OAuth2UserInfo oAuth2UserInfo = null;
        String check = String.valueOf(oAuth2User.getAttributes().get("kakao_account"));
        if(check != "null") {
            oAuth2UserInfo = new KakaoUserInfo(oAuth2User.getAttributes());
        } else{
            oAuth2UserInfo = new GoogleUserInfo(oAuth2User.getAttributes());
        }
        String password = new BCryptPasswordEncoder().encode(UUID.randomUUID().toString());
        String email = oAuth2UserInfo.getEmail();
        String name = oAuth2UserInfo.getName();

        List<String> authorities = authorityUtils.createRoles(email);


        Member member;
        try {
            member = saveMember(email, name, password);
            redirect(request, response, member, authorities);
        }catch (Exception e){
            redirect(request, response, memberService.findMember(email), authorities);
        }



    }

    private Member saveMember(String email, String name, String password) {
        Member member = new Member(email, name, password);
        return memberService.createMember(member);
    }

    public void redirect(HttpServletRequest request, HttpServletResponse response, Member member, List<String> authorities) throws IOException {

        String refreshToken = delegateRefreshToken(member.getEmail());
        String accessToken = delegateAccessToken(member, authorities);
        String addedAccessToken = "Bearer " + accessToken;

        /*
        if(refreshTokenRepository.existsByMemberId(member.getMemberId()) == true){
            Optional<RefreshToken> optionalRefreshToken = refreshTokenRepository.findByMemberId(member.getMemberId());
            RefreshToken findtoken = optionalRefreshToken.get();
            findtoken.setValue(refreshToken);
            refreshTokenRepository.save(findtoken);
        }else{
            RefreshToken refreshTokenEntity = new RefreshToken();
            refreshTokenEntity.setValue(refreshToken);
            refreshTokenEntity.setMemberId(member.getMemberId());
            refreshTokenService.addRefreshToken(refreshTokenEntity);
        }

         */

        response.setHeader("Authorization", addedAccessToken);
        response.setHeader("Refresh", refreshToken);
        response.setHeader("roles", "user");
        response.setHeader("memberId", String.valueOf(member.getMemberId()));

        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");
        Member fm = memberService.findVerifiedMember(member.getMemberId());
        response.getWriter().write(fm.getName());

        RefreshToken refreshTokenEntity = new RefreshToken();
        refreshTokenEntity.setValue(refreshToken);
        refreshTokenEntity.setMemberId(member.getMemberId());
        refreshTokenService.addRefreshToken(refreshTokenEntity);


        String uri = createURI(addedAccessToken, refreshToken).toString();
        getRedirectStrategy().sendRedirect(request, response, uri);
    }

    private String delegateAccessToken(Member member, List<String> authorities) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("memberId", member.getMemberId());
        claims.put("id", member.getEmail());
        claims.put("roles", authorities);
;
        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(String username) {
        String subject = username;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateMemberRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }

    private URI createURI(String accessToken, String refreshToken) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("Authorization", accessToken);
        queryParams.add("Refresh", refreshToken);

        // 추후 프론트 준비 왼료시 바꿈
        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("recloset-bucket.s3-website.ap-northeast-2.amazonaws.com")
                .port(80)
                .path("/")
                .queryParams(queryParams)
                .build()
                .toUri();
    }

}
