package com.main.project.admin.service;

import com.main.project.admin.entity.Admin;
import com.main.project.admin.repository.AdminQueryRepository;
import com.main.project.admin.repository.AdminRepository;
import com.main.project.auth.util.AdminCustomAuthorityUtils;
import com.main.project.dto.queryresponse.ProductResponse;
import com.main.project.exception.businessLogicException.BusinessLogicException;
import com.main.project.exception.businessLogicException.ExceptionCode;
import com.main.project.dto.queryget;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final AdminRepository adminRepository;
    private final AdminQueryRepository adminQueryRepository;
    private final AdminCustomAuthorityUtils authorityUtils;
    private final PasswordEncoder passwordEncoder;

    private void verifyExistEmail(String email) {
        Optional<Admin> admin = adminRepository.findByEmail(email);
        if (admin.isPresent())
            throw new BusinessLogicException(ExceptionCode.ADMIN_EXISTS);
    }
    private void verifyExistAdmin(long adminId) {
        Optional<Admin> admin = adminRepository.findById(adminId);
        if (admin.isPresent())
            throw new BusinessLogicException(ExceptionCode.ADMIN_EXISTS);
    }
    public Admin createAdmin(Admin admin){
        verifyExistEmail(admin.getEmail());

        String encryptedPassword = passwordEncoder.encode(admin.getPassword());
        admin.setPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(admin.getEmail());
        admin.setRoles(roles);

        return adminRepository.save(admin);
    }

    public Page<ProductResponse> searchProdcutwait(int page, int size, String keyword){
        return adminQueryRepository.getAdminProductwait(PageRequest.of(page,size), keyword);
    }


    public Page<ProductResponse> getAdminProduct(Long memberId, int page, int size, String keyword, boolean issell){
        return adminQueryRepository.getAdminProduct(memberId, PageRequest.of(page,size), keyword, issell);
    }
    public Admin loginAdmin(Admin admin){
        Admin findAdmin = adminRepository.findByEmail(admin.getEmail()).orElseThrow(()->new BusinessLogicException(ExceptionCode.ADMIN_NOT_FOUND));
        if(!passwordEncoder.matches(admin.getPassword(), findAdmin.getPassword())){
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }

        return findAdmin;
    }

    public Admin findAdminById(long adminId){
        Optional<Admin> optionalAdmin = adminRepository.findById(adminId);
        return optionalAdmin.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ADMIN_NOT_FOUND));
    }

    public Admin findAdminByEmail(String email){
        Optional<Admin> optionalAdmin = adminRepository.findByEmail(email);
        return optionalAdmin.orElseThrow(() -> new BusinessLogicException(ExceptionCode.UNAUTHORIZED));
    }
}
