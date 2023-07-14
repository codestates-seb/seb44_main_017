package com.main.project.product.mapper;
// mapper interface implementation

import com.main.project.product.controller.dto.ProductDto;
import com.main.project.product.entity.Product;
import com.main.project.productComment.ProductComment;
import com.main.project.productComment.dto.ProductCommentDto;
import com.main.project.response.ListResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    // TODO: Mapping needed

    ListResponseDto<ProductDto.Response> productsToProductResponses(List<Product> products, Long memberId);

    List<ProductDto.Response> productsToProductResponses(List<Product> products);

    @Mapping(target = "productLike", expression = "java(product.isLikedByMember(memberId))")
    @Mapping(target = "memberId", source = "member.memberId")
    ProductDto.Response productToProductResponse(Product product);

    @Mapping(target = "productLike", expression = "java(product.isLikedByMember(findMemberId))")
    @Mapping(target = "memberId", source = "member.memberId")
    default ProductDto.Response productToProductResponse(Product product, Long findMemberId) {
        ProductDto.Response response = productToProductResponse(product);
        response.setProductLike(product.isLikedByMember(findMemberId));
        return response;
    }

    @Mapping(target = "member.memberId", source = "memberId")
    Product productPostDtoToProduct(ProductDto.Post productPostDto);

    Product productPatchDtotoProduct(ProductDto.Patch productPatchDto);

    @Mapping(target = "productLike", expression = "java(product.isLikedByMember(findMemberId))")
    @Mapping(target = "memberId", source = "product.member.memberId")
    ProductDto.ResponseWithComments productToProductResponseWithComment
            (Product product, Long findMemberId);


    @Mapping(target = "memberId", source = "product.member.memberId")
    ProductDto.ResponseWithComments productToProductResponseWithComment(Product product);

    ProductComment productCommentDtoToProductComment(ProductCommentDto.Post productCommentDto);

    Product NproductPatchDtotoProduct(ProductDto.UserPP requestbody);

    //Eproduct productToEproduct(Product product);
}
