package com.main.project.productComment.mapper;

import com.main.project.productComment.ProductComment;
import com.main.project.productComment.dto.ProductCommentDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductCommentMapper {
//    @Mapping(target = "writer.memberId", source = "product.member.memberId")
    ProductCommentDto.Response productCommentToProductCommentResponseDto
            (ProductComment productComment);

    List<ProductCommentDto.Response> productCommentsToProductCommentResponseDto
            (List<ProductComment> productComments);

    ProductComment productCommentDtoToProductComment(ProductCommentDto.Post productCommentDto);

    ProductComment productCommentDtoToProductComment(ProductCommentDto.Patch productCommentDto);
}
