package com.main.project.ProductTest.controllerTest;

import com.google.gson.Gson;
import com.main.project.admin.dto.AdminDto;
import com.main.project.admin.entity.Admin;
import com.main.project.admin.mapper.AdminMapper;
import com.main.project.admin.service.AdminService;
import com.main.project.auth.dto.AdminLoginDto;
import com.main.project.auth.dto.TokenResponseDto;
import com.main.project.auth.jwt.JwtTokenizer;
import com.main.project.member.dto.MemberDto;
import com.main.project.member.entity.Member;
import com.main.project.member.mapper.MemberMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import org.apache.http.Header;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;

import java.io.FileInputStream;
import java.security.Key;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import io.jsonwebtoken.security.Keys;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.startsWith;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoder;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.*;
@SpringBootTest
@AutoConfigureMockMvc
public class AdminControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private Gson gson;
    @Autowired
    private AdminMapper mapper;
    @MockBean
    private AdminService adminService;
    @MockBean
    private JwtTokenizer jwtTokenizer;
    @DisplayName("유저 회원가입 테스트")
    @Test
    void postAdminTest() throws Exception {
        //given
        AdminDto.Post post = new AdminDto.Post("홍길동", "hgdkkk@gmail.com", "Abcd1234","010-1234-1234");

        Admin admin = mapper.adminPostToAdmin(post);
        admin.setAdminId(1L);
        given(adminService.createAdmin(Mockito.any(Admin.class))).willReturn(admin);

        String content = gson.toJson(post);

        //when
        ResultActions actions =
                mockMvc.perform(
                        post("/admin")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );
        //then
        actions
                .andExpect(status().isCreated());
    }

    @DisplayName("관리자 로그인 테스트")
    @Test
    void AdminLogin() throws Exception {
        //given
        AdminLoginDto loginDto = new AdminLoginDto("admin0@gmail.com", "qwer1234");
        TokenResponseDto tokenResponseDto = new TokenResponseDto("Bearer eyJhbGciOiJIUzM4NCJ9.eyJhZG1pbm5hbWUiOiJhZG1pbjBAZ21haWwuY29tIiwiYWRtaW5JZCI6NSwic3ViIjoiYWRtaW4wQGdtYWlsLmNvbSIsImlhdCI6MTY5MDM2NDA5NywiZXhwIjoxNjkwOTY0MDM3fQ.PPhsIr5sSSkfdHf2JqUMUKf0Q027Es6baRZ8NA8XmYEh2ZoYzSPgZf_H85v6-_d3","eyJhbGciOiJIUzM4NCJ9.eyJpc3MiOiJhZG1pbiIsInN1YiI6ImFkbWluMEBnbWFpbC5jb20iLCJpYXQiOjE2OTAzNjQwOTcsImV4cCI6MTY5NjM2NDAzN30.UpcLD3fIqsxUefciRIsMFzvBSsQrViT38JdoLAEqWsP6MzehA-QNRIqi1gEAxjlh");
        Admin admin = mapper.loginDtoToAdmin(loginDto);
        Admin authorizedadmin = new Admin();
        authorizedadmin.setAdminId(5L);
        authorizedadmin.setName("관리자");
        authorizedadmin.setEmail("admin0@gmail.com");
        authorizedadmin.setPhone("010-1234-1234");
        AdminDto.Response responseDto = mapper.adminToAdminResponseDto(authorizedadmin);
        String secretKey = "kevin123412341234123412341234123412341231412314123123124124124";
        byte[] keyBytes = Decoders.BASE64.decode(Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8)));
        Key key = Keys.hmacShaKeyFor(keyBytes);
        Jws<Claims> claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(tokenResponseDto.getAtk());

        given(adminService.loginAdmin(Mockito.any(Admin.class))).willReturn(authorizedadmin);
        given(jwtTokenizer.createTokenByLogin(responseDto)).willReturn(tokenResponseDto);
        given(jwtTokenizer.getClaims(tokenResponseDto.getAtk()).getBody()).willReturn(claims.getBody());
        String content = gson.toJson(loginDto);

        //when
        ResultActions actions =
                mockMvc.perform(
                        post("/admin/login")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );
        //then
        actions
                .andExpect(status().isOk());
    }

}
