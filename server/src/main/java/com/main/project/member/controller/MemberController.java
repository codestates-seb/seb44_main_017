package com.main.project.member.controller;

import com.main.project.alarm.service.SseService;
import com.main.project.dto.MultiResponseDto;
import com.main.project.dto.SingleResponseDto;
import com.main.project.dto.queryget;
import com.main.project.dto.queryresponse.ProductResponse;
import com.main.project.dto.queryresponse.QuestionResponse;
import com.main.project.exception.businessLogicException.BusinessLogicException;
import com.main.project.exception.businessLogicException.ExceptionCode;
import com.main.project.member.dto.MemberDto;
import com.main.project.member.entity.Member;
import com.main.project.member.entity.RefreshToken;
import com.main.project.member.mapper.MemberMapper;
import com.main.project.member.repository.RefreshTokenRepository;
import com.main.project.member.service.MemberService;
import com.main.project.member.service.RefreshTokenService;
import com.main.project.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/members")
@Slf4j
@RequiredArgsConstructor
public class MemberController {
    private final static String MEMBER_DEFAULT_URL = "/members";
    private final MemberService memberService;
    private final RefreshTokenService refreshTokenService;
    private final MemberMapper mapper;
    private final RefreshTokenRepository refreshTokenRepository;
    private final SseService sseService;
    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody) {
        Member member = mapper.memberPostToMember(requestBody);
        Member createdMember = memberService.createMember(member);
        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, createdMember.getMemberId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(
            @PathVariable("member-id") @Positive long memberId,
            @Valid @RequestBody MemberDto.Patch requestBody) {
        requestBody.setMemberId(memberId);

        Member member =
                memberService.updateMember(mapper.memberPatchToMember(requestBody));

        return ResponseEntity.ok(mapper.memberToMemberResponse(member));
    }

    @PatchMapping("/image/{member-id}")
    public ResponseEntity imageupload(@PathVariable("member-id") @Positive long memberId,
                                      @RequestPart List<MultipartFile> multipartFile){
        return ResponseEntity.status(HttpStatus.OK).body(memberService.uploadImage(multipartFile,memberId));
    }
    @PatchMapping("ban/{member-id}")
    public ResponseEntity memberban(@PathVariable("member-id") @Positive Long memberId){
        Member member = memberService.memberban(memberId);
        return ResponseEntity.ok(mapper.memberToMemberResponse(member));
    }
    @GetMapping("/search")
    public ResponseEntity searchMemberlist(@RequestParam String keyword,
                                           @Positive @RequestParam int page,
                                           @Positive @RequestParam int size){
        Page<Member> members = memberService.searchMemberlist(keyword,page-1,size);
        List<Member> memberList = members.getContent();
        return ResponseEntity.ok(new MultiResponseDto(mapper.membersToMemberResponses(memberList),members));
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") @Positive long memberId) {
        Member member = memberService.findVerifiedMember(memberId);
        MemberDto.Response response = mapper.memberToMemberResponse(member);
        return ResponseEntity.ok(new SingleResponseDto<>(response));
    }

    @GetMapping("/productst")
    public ResponseEntity userproduct(@RequestHeader(name = "Refresh") String token,
                                      @Positive @RequestParam int page,
                                      @Positive @RequestParam int size,
                                      @RequestParam(required = false) String sort){
        Long memberId = findmemberId(token);
        Page<ProductResponse> ss = memberService.getMemberProduct(Long.valueOf(memberId),page-1,size,sort,true);
        List<ProductResponse> productList = ss.getContent();
        return ResponseEntity.ok(new MultiResponseDto(productList,ss));
    }

    @GetMapping("/productsf")
    public ResponseEntity userproductns(@RequestHeader(name = "Refresh") String token,
                                        @Positive @RequestParam int page,
                                        @Positive @RequestParam int size,
                                        @RequestParam(required = false) String sort){
        Long memberId = findmemberId(token);
        Page<ProductResponse> ss = memberService.getMemberProduct(Long.valueOf(memberId),page-1,size,sort,false);
        List<ProductResponse> productList = ss.getContent();
        return ResponseEntity.ok(new MultiResponseDto(productList,ss));
    }

    @GetMapping("/productwait")
    public ResponseEntity userproductwait(@RequestHeader(name = "Refresh") String token,
                                          @Positive @RequestParam int page,
                                          @Positive @RequestParam int size){
        Long memberId = findmemberId(token);
        Page<ProductResponse> ss = memberService.searchMemberProdcutwait(memberId,page-1,size);
        List<ProductResponse> productList = ss.getContent();
        return ResponseEntity.ok(new MultiResponseDto(productList,ss));
    }

    @GetMapping("/productdeny")
    public ResponseEntity userproductdeny(@RequestHeader(name = "Refresh") String token,
                                          @Positive @RequestParam int page,
                                          @Positive @RequestParam int size){
        Long memberId = findmemberId(token);
        Page<ProductResponse> ss = memberService.searchMemberProdcutdeny(memberId,page-1,size);
        List<ProductResponse> productList = ss.getContent();
        return ResponseEntity.ok(new MultiResponseDto(productList,ss));
    }

    @GetMapping("namecheck/{name}")
    public ResponseEntity<Boolean> usercheckname(@PathVariable String name){

        return ResponseEntity.ok(memberService.verifyExistname(name));
    }

    @GetMapping("getqna")
    public ResponseEntity userquestion(@RequestHeader(name = "Refresh") String token,
                                       @Positive @RequestParam int page,
                                       @Positive @RequestParam int size){
        Long memberId = findmemberId(token);
        Page<QuestionResponse> ss = memberService.searchMemberQuestion(memberId,page-1,size);
        List<QuestionResponse> productList = ss.getContent();
        return ResponseEntity.ok(new MultiResponseDto(productList,ss));
    }
    @GetMapping
    public ResponseEntity getMembers(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size) {
        Page<Member> pageMembers = memberService.findMembers(page - 1, size);
        List<Member> members = pageMembers.getContent();
        return ResponseEntity.ok(new MultiResponseDto(mapper.membersToMemberResponses(members), pageMembers));

    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(
            @PathVariable("member-id") @Positive long memberId) {
        memberService.deleteMember(memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @DeleteMapping("/logout")
    public ResponseEntity logout(@RequestHeader("Refresh") @Positive String refreshtoken) {
        Long memberId = findmemberId(refreshtoken);
        refreshTokenService.deleteRefreshToken(refreshtoken);
        sseService.deletealarm(memberId);
        return new ResponseEntity(HttpStatus.OK);
    }

    public Long findmemberId(String token) {
        Optional<RefreshToken> refresht = refreshTokenRepository.findByValue(token);
        RefreshToken findtoken = refresht.orElseThrow(()-> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findtoken.getMemberId();
    }
}
