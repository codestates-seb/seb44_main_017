package com.main.project.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AdminLoginDto {
    private String email;
    private String password;
}
