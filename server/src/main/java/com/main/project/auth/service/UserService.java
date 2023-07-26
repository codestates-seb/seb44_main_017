package com.main.project.auth.service;

import com.main.project.admin.entity.Admin;
import com.main.project.auth.util.AdminCustomAuthorityUtils;
import com.main.project.exception.businessLogicException.BusinessLogicException;
import com.main.project.exception.businessLogicException.ExceptionCode;
import com.main.project.member.entity.Member;
import com.main.project.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {
    private final MemberRepository memberRepository;
    private final AdminCustomAuthorityUtils authorityUtils;
    private final PasswordEncoder passwordEncoder;

    public Member loginMember(Member member){


        Member findMember = memberRepository.findByEmail(member.getEmail()).orElseThrow(()->new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        if(!passwordEncoder.matches(member.getPassword(), findMember.getPassword())){
            //throw new BusinessLogicException(ExceptionCode.PASSWORD_ERROR);
        }


        return findMember;
    }
}
