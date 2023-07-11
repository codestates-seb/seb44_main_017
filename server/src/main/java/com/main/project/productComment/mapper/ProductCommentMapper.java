package com.main.project.productComment.mapper;

import com.main.project.productComment.ProductComment;
import com.main.project.productComment.dto.ProductCommentDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductCommentMapper {
    ProductCommentDto.Response productCommentToProductCommentResponseDto
            (ProductComment productComment);

    List<ProductCommentDto.Response> productCommentsToProductCommentResponseDto
            (List<ProductComment> productComments);
}
