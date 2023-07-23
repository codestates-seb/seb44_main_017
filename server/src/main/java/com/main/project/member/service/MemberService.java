package com.main.project.member.service;

import com.main.project.auth.util.UserCustomAuthorityUtils;
import com.main.project.dto.queryresponse.ProductResponse;
import com.main.project.dto.queryresponse.QuestionResponse;
import com.main.project.exception.businessLogicException.BusinessLogicException;
import com.main.project.exception.businessLogicException.ExceptionCode;
import com.main.project.dto.queryget;
import com.main.project.member.entity.Member;
import com.main.project.member.repository.MemberQueryRepository;
import com.main.project.member.repository.MemberRepository;
import com.main.project.product.entity.Product;
import com.main.project.s3.service.AwsS3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final MemberQueryRepository memberQueryRepository;
    private final UserCustomAuthorityUtils authorityUtils;
    private final PasswordEncoder passwordEncoder;
    private final AwsS3Service awsS3Service;

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
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        Optional.ofNullable(member.getName()).ifPresent(name -> fm.setName(member.getName()));
        Optional.ofNullable(member.getPhone()).ifPresent(phone -> fm.setPhone(member.getPhone()));
        Optional.ofNullable(member.getPassword()).ifPresent(password -> fm.setPassword(encryptedPassword));

        return memberRepository.save(fm);
    }

    public Member addMemberMoney(Member member, Integer pointValue){
        member.setMoney(member.getMoney() + pointValue);
        return memberRepository.save(member);
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

    public Page<ProductResponse> getMemberProduct(Long memberId, int page, int size, String keyword, boolean issell){

        return memberQueryRepository.getMemberProduct(memberId, PageRequest.of(page,size), keyword, issell);
    }

    public Page<Member> searchMemberlist(String keyword, int page, int size){
        return memberRepository.findByNameContaining(keyword, PageRequest.of(page, size));
    }
    public Page<ProductResponse> searchMemberProdcutwait(Long memberId, int page, int size){

        return memberQueryRepository.getMemberProductwait(memberId, PageRequest.of(page, size));
    }

    public Page<ProductResponse> searchMemberProdcutdeny(Long memberId, int page, int size){

        return memberQueryRepository.getMemberProductdeny(memberId, PageRequest.of(page, size));
    }

    public Page<QuestionResponse> searchMemberQuestion(Long memberId, int page, int size){
        return memberQueryRepository.getMemberQuestions(memberId, PageRequest.of(page, size));
    }

    public Member findMember(String email){
        return  memberRepository.findByEmail(email).get();
    }


}
