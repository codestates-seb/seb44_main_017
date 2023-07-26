package com.main.project.auth.filter;

import com.main.project.auth.jwt.JwtTokenizer;
import com.main.project.auth.util.AdminCustomAuthorityUtils;
import com.main.project.auth.util.UserCustomAuthorityUtils;
import com.main.project.member.entity.RefreshToken;
import com.main.project.member.repository.RefreshTokenRepository;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
public class UserJwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final UserCustomAuthorityUtils authorityUtils;
    private final RefreshTokenRepository refreshTokenRepository;

    public UserJwtVerificationFilter(JwtTokenizer jwtTokenizer, UserCustomAuthorityUtils authorityUtils, RefreshTokenRepository refreshTokenRepository){
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.refreshTokenRepository = refreshTokenRepository;
    }



    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException{

        try {
            if(getToken(request) == true) {
                Map<String, Object> claims = verifyJws(request);
                setAuthenticationToContext(claims);
            }


        } catch (SignatureException se) {
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) {
            request.setAttribute("exception", ee);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }

        filterChain.doFilter(request, response);
    }


    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");

        return authorization == null || !authorization.startsWith("Bearer");
    }

    private Map<String, Object> verifyJws(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();

        return claims;
    }



    private void setAuthenticationToContext(Map<String, Object> claims) {
        String username = (String) claims.get("username");
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List)claims.get("roles"));
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    private boolean getToken(HttpServletRequest request) {
        String Refresh = request.getHeader("Refresh");
        if (StringUtils.hasText(Refresh)){
            Optional<RefreshToken> findfresh = refreshTokenRepository.findByValue(Refresh);
            RefreshToken Ref = findfresh.get();
            if(Ref == null) return false;
            else return true;
        }
        return false;
    }


}