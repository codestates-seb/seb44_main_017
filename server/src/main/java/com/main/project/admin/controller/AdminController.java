package com.main.project.admin.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.main.project.admin.dto.AdminDto;
import com.main.project.admin.entity.Admin;
import com.main.project.admin.mapper.AdminMapper;
import com.main.project.admin.service.AdminService;
import com.main.project.auth.dto.AdminLoginDto;
import com.main.project.auth.dto.TokenResponseDto;
import com.main.project.auth.jwt.JwtTokenizer;
import com.main.project.dto.MultiResponseDto;
import com.main.project.dto.SingleResponseDto;
import com.main.project.dto.queryget;
import com.main.project.dto.queryresponse.ProductResponse;
import com.main.project.exception.businessLogicException.BusinessLogicException;
import com.main.project.exception.businessLogicException.ExceptionCode;
import com.main.project.member.entity.RefreshToken;
import com.main.project.member.repository.RefreshTokenRepository;
import com.main.project.member.service.RefreshTokenService;
import com.main.project.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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
    private final RefreshTokenRepository refreshTokenRepository;

    @Transactional
    @PostMapping("/login")
    public ResponseEntity login(@Valid @RequestBody AdminLoginDto loginDto) throws JsonProcessingException{
        Admin admin = mapper.loginDtoToAdmin(loginDto);

        Admin authorizedAdmin = adminService.loginAdmin(admin);
        AdminDto.Response responseDto = mapper.adminToAdminResponseDto(authorizedAdmin);

        TokenResponseDto tokenResponseDto = jwtTokenizer.createTokenByLogin(responseDto);

        Map<String, Object> claims = jwtTokenizer.getClaims(tokenResponseDto.getAtk()).getBody();
        long adminId = Long.parseLong(claims.get("adminId").toString());
        Admin findadmin = adminService.findAdminById(adminId);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + tokenResponseDto.getAtk());
        headers.add("Refresh", tokenResponseDto.getRtk());
        headers.add("roles", "admin");
        headers.add("adminId", String.valueOf(findadmin.getAdminId()));

        return new ResponseEntity<>(new SingleResponseDto<>(findadmin.getName()), headers, HttpStatus.OK);

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

    @GetMapping("/productst")
    public ResponseEntity userproduct(@RequestHeader(name = "Refresh") String token,
                                      @Positive @RequestParam int page,
                                      @Positive @RequestParam int size,
                                      @RequestParam(required = false) String sort){
        Long adminId = findAdminId(token);
        Page<ProductResponse> ss = adminService.getAdminProduct(Long.valueOf(adminId),page-1,size,sort,true);
        List<ProductResponse> productList = ss.getContent();
        return ResponseEntity.ok(new MultiResponseDto(productList,ss));
    }

    @GetMapping("/productsf")
    public ResponseEntity userproductns(@RequestHeader(name = "Refresh") String token,
                                        @Positive @RequestParam int page,
                                        @Positive @RequestParam int size,
                                        @RequestParam(required = false) String sort){
        Long adminId = findAdminId(token);
        Page<ProductResponse> ss = adminService.getAdminProduct(Long.valueOf(adminId),page-1,size,sort,false);
        List<ProductResponse> productList = ss.getContent();
        return ResponseEntity.ok(new MultiResponseDto(productList,ss));
    }

    @GetMapping("/productwait")
    public ResponseEntity getproductwait(@Positive @RequestParam int page,
                                         @Positive @RequestParam int size,
                                         @RequestParam(required = false) String sort){
        Page<ProductResponse> ss = adminService.searchProdcutwait(page-1,size,sort);
        List<ProductResponse> productList = ss.getContent();
        return ResponseEntity.ok(new MultiResponseDto(productList,ss));
    }

    public Long findAdminId(String token) {
        Optional<RefreshToken> refresht = refreshTokenRepository.findByValue(token);
        RefreshToken findtoken = refresht.orElseThrow(()-> new BusinessLogicException(ExceptionCode.ADMIN_NOT_FOUND));
        return findtoken.getAdminId();
    }


}
