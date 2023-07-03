package com.main.project.admin.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.main.project.admin.dto.AdminDto;
import com.main.project.admin.entity.Admin;
import com.main.project.admin.mapper.AdminMapper;
import com.main.project.admin.service.AdminService;
import com.main.project.auth.dto.AdminLoginDto;
import com.main.project.auth.dto.TokenResponseDto;
import com.main.project.auth.jwt.JwtTokenizer;
import com.main.project.dto.SingleResponseDto;
import com.main.project.member.service.RefreshTokenService;
import com.main.project.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@Slf4j
@RequiredArgsConstructor
public class AdminController {
    private final static String ADMIN_DEFAULT_URL = "/admin";
    private final AdminService adminService;
    private final JwtTokenizer jwtTokenizer;
    private final RefreshTokenService refreshTokenService;
    private final AdminMapper mapper;

    @Transactional
    @PostMapping("/login")
    public ResponseEntity login(@Valid @RequestBody AdminLoginDto loginDto) throws JsonProcessingException{
        Admin admin = mapper.loginDtoToAdmin(loginDto);
        Admin authorizedAdmin = adminService.loginAdmin(admin);
        AdminDto.Response responseDto = mapper.adminToAdminResponseDto(authorizedAdmin);

        TokenResponseDto tokenResponseDto = jwtTokenizer.createTokenByLogin(responseDto);

        Map<String, Object> claims = jwtTokenizer.getClaims(tokenResponseDto.getAtk()).getBody();
        long adminId = Long.parseLong(claims.get("adminId").toString());

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + tokenResponseDto.getAtk());
        headers.add("Refresh", tokenResponseDto.getRtk());

        return new ResponseEntity<>(new SingleResponseDto<>(adminId), headers, HttpStatus.OK);

    }
    @PostMapping
    public ResponseEntity postAdmin(@Valid @RequestBody AdminDto.Post requestBody) {
        Admin admin = mapper.adminPostToAdmin(requestBody);

        Admin createdAdmin = adminService.createAdmin(admin);
        URI location = UriCreator.createUri(ADMIN_DEFAULT_URL, createdAdmin.getAdminId());

        return ResponseEntity.created(location).build();
    }
    @DeleteMapping("/logout")
    public ResponseEntity logout(@RequestHeader("Refresh") @Positive String refreshtoken) {
        log.info(refreshtoken);
        refreshTokenService.deleteRefreshToken(refreshtoken);
        return new ResponseEntity(HttpStatus.OK);
    }
}
