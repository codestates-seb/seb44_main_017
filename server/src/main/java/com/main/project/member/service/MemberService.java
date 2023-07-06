package com.main.project.member.service;

import com.main.project.auth.util.UserCustomAuthorityUtils;
import com.main.project.exception.BusinessLogicException;
import com.main.project.exception.ExceptionCode;
import com.main.project.member.entity.Member;
import com.main.project.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    private final UserCustomAuthorityUtils authorityUtils;
    private final PasswordEncoder passwordEncoder;

    private void verifyExistEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }
    private void verifyExistMember(long memberId) {
        Optional<Member> member = memberRepository.findById(memberId);
        if (member.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }
    public Member createMember(Member member){
        verifyExistEmail(member.getEmail());

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        return memberRepository.save(member);
    }

    public List<String> uploadImage(List<MultipartFile> multipartFile, Long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member fm = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        List<String> fileName = new ArrayList<>();
        fileName.forEach(file ->{
            Optional.ofNullable(file).ifPresent(profile -> fm.setProfile(file));
            memberRepository.save(fm);
        });
        return fileName;
    }

    public Member updateMember(Member member) {
        Optional<Member> optionalMember = memberRepository.findById(member.getMemberId());
        Member fm = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        Optional.ofNullable(member.getName()).ifPresent(name -> fm.setName(member.getName()));
        Optional.ofNullable(member.getPhone()).ifPresent(phone -> fm.setPhone(member.getPhone()));
        Optional.ofNullable(member.getPassword()).ifPresent(birthday -> fm.setPassword(member.getPassword()));

        return memberRepository.save(fm);
    }
    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member findMember = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }
    public Page<Member> findMembers(int page, int size) {
        return memberRepository.findAll(PageRequest.of(page, size, Sort.by("memberId").descending()));
    }

    public void deleteMember(long memberId) {
        Member findMember = findVerifiedMember(memberId);
        memberRepository.delete(findMember);
    }

    public Member findMember(String email){
        return  memberRepository.findByEmail(email).get();
    }

}
