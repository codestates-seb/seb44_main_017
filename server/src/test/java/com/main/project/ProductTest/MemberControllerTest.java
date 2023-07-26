package com.main.project.ProductTest;

import com.google.gson.Gson;
import com.main.project.dto.queryresponse.ProductResponse;
import com.main.project.member.dto.MemberDto;
import com.main.project.member.entity.Member;
import com.main.project.member.mapper.MemberMapper;
import com.main.project.member.repository.MemberQueryRepository;
import com.main.project.member.repository.MemberRepository;
import com.main.project.member.service.MemberService;
import com.main.project.product.mapper.ProductMapper;
import com.main.project.product.service.ProductService;

import com.google.gson.Gson;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.startsWith;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class MemberControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private MemberService memberService;

    @Autowired
    private MemberMapper mapper;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private MemberQueryRepository memberQueryRepository;
    private static String path = "/members";

    @DisplayName("유저 회원가입 테스트")
    @Test
    void postMemberTest() throws Exception {
        //given
        MemberDto.Post post = new MemberDto.Post("홍길동", "hgd@gmail.com", "Abcd1234","010-1234-1234");

        Member member = mapper.memberPostToMember(post);
        member.setMemberId(1L);
        given(memberService.createMember(Mockito.any(Member.class))).willReturn(member);

        String content = gson.toJson(post);

        //when
        ResultActions actions =
                mockMvc.perform(
                        post("/members")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );
        //then
        actions
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", is(startsWith("/members/"))));
    }

    @DisplayName("회원정보 수정")
    @Test
    void PatchMemberTest() throws Exception{
        MemberDto.Patch patch = new MemberDto.Patch(1L,"Abcd1234","홍길동","010-1234-1234");
        Member member = mapper.memberPatchToMember(patch);

        given(memberService.updateMember(Mockito.any(Member.class))).willReturn(member);

        String content = gson.toJson(patch);
        //when
        ResultActions actions =
                mockMvc.perform(
                        patch("/members/1")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );
        //then
        actions
                .andExpect(status().isOk());
    }

    @DisplayName("내가 올린 물품중 팔린물품 list 출력")
    @Test
    void GetMemberProductst() throws Exception{

        given(memberService.getMemberProduct(1L,1,1,"newest",true)).willReturn();

        ResultActions actions =
                mockMvc.perform(
                        get("/members/productst")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                );
        //then
        actions
                .andExpect(status().isOk());
    }
}
