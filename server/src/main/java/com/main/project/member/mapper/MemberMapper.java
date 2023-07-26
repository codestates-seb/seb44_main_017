package com.main.project.member.mapper;

import com.main.project.admin.entity.Admin;
import com.main.project.auth.dto.AdminLoginDto;
import com.main.project.auth.dto.UserLoginDto;
import com.main.project.member.dto.MemberDto;
import com.main.project.member.entity.Member;
import org.mapstruct.Mapper;

import java.util.List;
@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member loginDtoToMember(UserLoginDto loginDto);
    Member memberPostToMember(MemberDto.Post requestBody);
    Member memberPatchToMember(MemberDto.Patch requestBody);
    MemberDto.Response memberToMemberResponse(Member member);
    List<MemberDto.Response> membersToMemberResponses(List<Member> members);
}
