package com.main.project.admin.service;

import com.main.project.admin.entity.Admin;
import com.main.project.admin.repository.AdminRepository;
import com.main.project.auth.util.AdminCustomAuthorityUtils;
import com.main.project.exception.BusinessLogicException;
import com.main.project.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final AdminRepository adminRepository;
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

    public Admin loginAdmin(Admin admin){
        Admin findAdmin = adminRepository.findByEmail(admin.getEmail()).orElseThrow(()->new BusinessLogicException(ExceptionCode.ADMIN_NOT_FOUND));
        if(!passwordEncoder.matches(admin.getPassword(), findAdmin.getPassword())){
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }

        return findAdmin;
    }
}
