package com.main.project.questionComment.mapper;


import com.main.project.questionComment.dto.QCommentDto;
import com.main.project.questionComment.entity.QComment;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
@Component
public interface QCommentMapper {

    QComment QCommentDtoPostToQComment(QCommentDto.Post requestBody);

    QComment QCommentDtoPatchToQComment(QCommentDto.Patch requestBody);

    QCommentDto.Response QCommentToQCommentDtoResponse(QComment qComment);
}
