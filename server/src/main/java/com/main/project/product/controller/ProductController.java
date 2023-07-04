package com.main.project.product.controller;

import com.main.project.exception.BusinessLogicException;
import com.main.project.exception.ExceptionCode;
import com.main.project.member.entity.Member;
import com.main.project.member.entity.RefreshToken;
import com.main.project.member.service.MemberService;
import com.main.project.member.service.RefreshTokenService;
import com.main.project.product.dto.ProductDto;
import com.main.project.product.entity.Product;
import com.main.project.product.mapper.ProductMapper;
import com.main.project.product.service.ProductService;
import com.main.project.productComment.dto.ProductCommentDto;
import com.main.project.response.ListResponseDto;
import com.main.project.response.SingleResponseDto;
import com.main.project.utils.UriCreator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/products")
@Validated
@Slf4j
public class ProductController {
    private final static String PRODUCT_DEF_URL = "/products";

    private final ProductService productService;
    private final ProductMapper productMapper;
    private final RefreshTokenService refreshTokenService;

    public ProductController(ProductService productService, ProductMapper productMapper, MemberService memberService, RefreshTokenService refreshTokenService) {
        this.productService = productService;
        this.productMapper = productMapper;
        this.refreshTokenService = refreshTokenService;
    }

    // admin can post their product.
    @PostMapping
    public Product postProduct(@RequestHeader("Authorization") String tokenstr,
            @Valid @RequestBody ProductDto.Post productPostDto){
        Optional<RefreshToken> refreshToken = refreshTokenService.findRefreshToken(tokenstr);
        Long adminId = refreshToken
                .orElseThrow( () -> new BusinessLogicException(ExceptionCode.ADMIN_NOT_FOUND))
                .getAdminId();
        Product product = productService
                .createProduct(productMapper.productPostDtoToProduct(productPostDto), adminId);
        URI location = UriCreator.createUri(PRODUCT_DEF_URL, product.getProductId());
        return product;
    }

    // members can get products list
    // Todo : pagination, sort operation needed
    @GetMapping
    public ResponseEntity getProducts(@RequestHeader("Authorization") String tokenstr,
                                      @Positive @RequestParam int page,
                                      @Positive @RequestParam int size){
        Optional<RefreshToken> refreshToken = refreshTokenService.findRefreshToken(tokenstr);
        Long memberId = refreshToken
                .orElseThrow( () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND))
                .getMemberId();

        /* Todo : verify member and find if their liked product */

        Page<Product> pageProducts = productService.findProducts(page-1, size);
        List<Product> products = pageProducts.getContent();
        return new ResponseEntity<>(
                new ListResponseDto<>(
                        productMapper.productsToProductResponses(products)),
                        HttpStatus.OK
                );
    }

    // members can get product information
    @GetMapping("/{product-id}")
    public ResponseEntity getProduct(@RequestHeader("Authorization") String tokenstr,
                                     @PathVariable("product-id") @Positive Long productId){
        Optional<RefreshToken> refreshToken = refreshTokenService.findRefreshToken(tokenstr);
        Long memberId = refreshToken
                .orElseThrow( () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND))
                .getMemberId();

        Product product = productService.findProduct(productId);
        /* Todo : verify member and find if their liked product */
        return new ResponseEntity<>(
                new SingleResponseDto<>(
                        productMapper.productToProductResponseWithComment(product)),
                HttpStatus.OK
        );
    }

    // admins can modify their product
    @PatchMapping("/{product-id}")
    public ResponseEntity patchProducts(@PathVariable("product-id") @Positive Long productId,
                                        @RequestBody @Valid ProductDto.Patch productPatchDto){

        Product product = productService.updateProduct(productId, productMapper.productPatchDtotoProduct(productPatchDto));
        return new ResponseEntity<>(
                new SingleResponseDto<>(
                        productMapper.productToProductResponse(product)),
                HttpStatus.OK
        );
    }

    // admins can modify their product description

    // admins can delete their product
    @DeleteMapping("/{product-id}")
    public ResponseEntity deleteProduct(@PathVariable("product-id") @Positive Long productId){
        productService.deleteProduct(productId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // admins can update selling status
    @PostMapping("/{product-id}")
    public ResponseEntity updateSellingStatus(@PathVariable("product-id") @Positive Long productId,
                                              @RequestParam Boolean issell){
        Product product = productService.findProduct(productId);
        product.setIssell(issell);
        productService.updateProduct(productId, product);

        return new ResponseEntity<>(new SingleResponseDto<>(
                productMapper.productToProductResponse(product)),
                HttpStatus.OK);
    }

    @PostMapping("/{product-id}/comments")
    public ResponseEntity postProductComment(@RequestHeader("Authorization") String tokenstr,
                                             @PathVariable("product-id") @Positive Long productId,
                                             @RequestBody @Valid ProductCommentDto.Post productCommentDto){
        Product product = productService.findProduct(productId);
        Optional<RefreshToken> refreshToken = refreshTokenService.findRefreshToken(tokenstr);
        Long memberId = refreshToken
                .orElseThrow( () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND))
                .getMemberId();
        productService
                .createProductComment(product, memberId, productMapper.productCommentDtoToProductComment(productCommentDto));

        return new ResponseEntity<>(new SingleResponseDto<>(
                productMapper.productToProductResponse(product)),
                HttpStatus.OK);
    }
}
