package com.main.project.auth.UserController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.main.project.admin.dto.AdminDto;
import com.main.project.admin.entity.Admin;
import com.main.project.admin.mapper.AdminMapper;
import com.main.project.admin.service.AdminService;
import com.main.project.auth.dto.AdminLoginDto;
import com.main.project.auth.dto.TokenResponseDto;
import com.main.project.auth.dto.UserLoginDto;
import com.main.project.auth.jwt.JwtTokenizer;
import com.main.project.auth.service.UserService;
import com.main.project.dto.SingleResponseDto;
import com.main.project.exception.businessLogicException.BusinessLogicException;
import com.main.project.exception.businessLogicException.ExceptionCode;
import com.main.project.member.dto.MemberDto;
import com.main.project.member.entity.Member;
import com.main.project.member.mapper.MemberMapper;
import com.main.project.member.repository.RefreshTokenRepository;
import com.main.project.member.service.MemberService;
import com.main.project.member.service.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/user")
@Slf4j
@RequiredArgsConstructor
public class UserController {
    private final MemberMapper mapper;
    private final UserService userService;
    private final MemberService memberService;
    private final static String USER_DEFAULT_URL = "/user";
    private final JwtTokenizer jwtTokenizer;
    private final RefreshTokenService refreshTokenService;
    private final RefreshTokenRepository refreshTokenRepository;

    @Transactional
    @PostMapping("/login")
    public ResponseEntity login(@Valid @RequestBody UserLoginDto loginDto) throws JsonProcessingException {
        Member member = mapper.loginDtoToMember(loginDto);
        member.setEmail(loginDto.getUsername());
        Member authorizedMember = userService.loginMember(member);
        if(authorizedMember.getisban() == true){
            throw new BusinessLogicException(ExceptionCode.MEMBER_IS_BAN);
        }
        MemberDto.Response responseDto = mapper.memberToMemberResponse(authorizedMember);
        TokenResponseDto tokenResponseDto = jwtTokenizer.createTokenByLoginUser(responseDto);

        Map<String, Object> claims = jwtTokenizer.getClaims(tokenResponseDto.getAtk()).getBody();
        long memberId = Long.parseLong(claims.get("memberId").toString());
        Member findmember = memberService.findVerifiedMember(memberId);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + tokenResponseDto.getAtk());
        headers.add("Refresh", tokenResponseDto.getRtk());
        headers.add("roles", "user");
        headers.add("memberId", String.valueOf(findmember.getMemberId()));

        return new ResponseEntity<>(new SingleResponseDto<>(findmember.getName()), headers, HttpStatus.OK);

    }
}
