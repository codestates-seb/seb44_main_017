package com.main.project.admin.mapper;

import com.main.project.admin.dto.AdminDto;
import com.main.project.admin.entity.Admin;
import com.main.project.auth.dto.AdminLoginDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AdminMapper {
    Admin loginDtoToAdmin(AdminLoginDto loginDto);
    Admin adminPostToAdmin(AdminDto.Post requestBody);
    AdminDto.Response adminToAdminResponseDto(Admin admin);
}
