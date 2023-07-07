package com.main.project.member.service;

import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.main.project.auth.util.UserCustomAuthorityUtils;
import com.main.project.dto.queryget;
import com.main.project.exception.BusinessLogicException;
import com.main.project.exception.ExceptionCode;
import com.main.project.member.dto.MemberDto;
import com.main.project.member.entity.Member;
import com.main.project.member.repository.MemberRepository;
import com.main.project.s3.service.AwsS3Service;
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

    private final AwsS3Service awsS3Service;
    private final UserCustomAuthorityUtils authorityUtils;
    private final PasswordEncoder passwordEncoder;

    public boolean verifyExistname(String name){
        return memberRepository.existsByName(name);
    }
    public Member memberban(Long memberId){
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member fm = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        if(fm.getisban() == false)
            fm.setIsban(true);
        else{
            fm.setIsban(false);
        }
        return memberRepository.save(fm);
    }

    public void checkisban(Member member){
        if(member.getisban() == true)
            throw new BusinessLogicException(ExceptionCode.MEMBER_IS_BAN);
    }
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
        fileName = awsS3Service.uploadImage(multipartFile);
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

    public Page<queryget.product> searchMemberProdcut(Long memberId, int page, int size, String keyword, boolean issell){
        if(keyword.equals("oldest")){
            return memberRepository.findUserProductOld(memberId, issell, PageRequest.of(page, size));
        } else if(keyword.equals("mostlike")){
            //return memberRepository.findUserProductLike(memberId, issell, PageRequest.of(page, size));
        } else if(keyword.equals("mostview")){
            return memberRepository.findUserProductView(memberId, PageRequest.of(page, size));
        } else if(keyword.equals("pricedesc")){
            return memberRepository.findUserProductpricedesc(memberId, issell, PageRequest.of(page, size));
        } else if(keyword.equals("priceasc")){
            return memberRepository.findUserProductpriceasc(memberId, issell, PageRequest.of(page, size));
        }
        return memberRepository.findUserProductNew(memberId, issell, PageRequest.of(page, size));
    }

    public Page<Member> searchMemberlist(String keyword, int page, int size){
        return memberRepository.findByNameContaining(keyword, PageRequest.of(page, size));
    }
    public Page<queryget.product> searchMemberProdcutwait(Long memberId, int page, int size){

        return memberRepository.findUserProductwait(memberId, PageRequest.of(page, size));
    }

    public Page<queryget.denyproduct> searchMemberProdcutdeny(Long memberId, int page, int size){

        return memberRepository.findUserProductdeny(memberId, PageRequest.of(page, size));
    }

    public Page<queryget.question> searchMemberQuestion(Long memberId, int page, int size){
        return memberRepository.findUserQuestion(memberId, PageRequest.of(page, size));
    }

    public Member findMember(String email){
        return  memberRepository.findByEmail(email).get();
    }

}
