package com.main.project.product.controller;

import com.main.project.dto.MultiResponseDto;
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
import com.main.project.productComment.ProductComment;
import com.main.project.productComment.dto.ProductCommentDto;
import com.main.project.response.ListResponseDto;
import com.main.project.response.SingleResponseDto;
import com.main.project.utils.UriCreator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;
import java.util.Optional;

//@CrossOrigin(origins = "*", allowedHeaders = "*")
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
    public ResponseEntity postProduct(@RequestHeader("Refresh") String tokenstr,
            @Valid @RequestBody ProductDto.Post productPostDto){
        Optional<RefreshToken> refreshToken = refreshTokenService.findRefreshToken(tokenstr);
        Long adminId = refreshToken
                .orElseThrow( () -> new BusinessLogicException(ExceptionCode.ADMIN_NOT_FOUND))
                .getAdminId();
        Product product = productService
                .createProduct(productMapper.productPostDtoToProduct(productPostDto), adminId);
        URI location = UriCreator.createUri(PRODUCT_DEF_URL, product.getProductId());
        return ResponseEntity.created(location).build();
    }

    // members can get products list
    @GetMapping
    public ResponseEntity getProducts(
            @RequestHeader(value = "Refresh", required = false) String tokenstr,
                                      @Positive @RequestParam int page,
                                      @Positive @RequestParam int size,
                                      @RequestParam(required = false, defaultValue = "") String sort,
                                      @RequestParam(required = false) Boolean issell){
        Optional<RefreshToken> refreshToken = refreshTokenService.findRefreshToken(tokenstr);

        // Todo : Can view products as admin, unregistered user
        Long findMemberId = refreshToken
                .orElseThrow( () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND))
                .getMemberId();

        Sort.Direction sortDirection;
        String sortProperty;

        switch (sort) {
            case "newest":
            case "":
                sortDirection = Sort.Direction.DESC;
                sortProperty = "createAt";
                break;
            case "oldest":
                sortDirection = Sort.Direction.ASC;
                sortProperty = "createAt";
                break;
            case "mostlike":
                sortDirection = Sort.Direction.DESC;
                sortProperty = "likeCount";
                break;
            case "mostview":
                sortDirection = Sort.Direction.DESC;
                sortProperty = "view";
                break;
            case "priceasc":
                sortDirection = Sort.Direction.ASC;
                sortProperty = "price";
                break;
            case "pricedesc":
                sortDirection = Sort.Direction.DESC;
                sortProperty = "price";
                break;
            default:
                throw new IllegalArgumentException("Invalid sort option: " + sort);
        }

        Page<Product> pageProducts;
        if (issell != null) {
            // when issell is not null...

            pageProducts = productService
                    .findProducts(page-1, size, issell, sortProperty, sortDirection);

        } else {
            // when issell property is not given

            pageProducts = productService
                    .findProducts(page-1, size, sortProperty, sortDirection);
        }

        List<Product> products = pageProducts.getContent();
        return new ResponseEntity<>(
                new ListResponseDto<>(
                        productMapper.productsToProductResponses(products, findMemberId)
                ),
                HttpStatus.OK
        );

    }

    // members can get product information
    @GetMapping("/{product-id}")
    public ResponseEntity getProduct(@RequestHeader(value = "Refresh", required = false)
                                         String tokenstr,
                                     @PathVariable("product-id") @Positive Long productId){
        Optional<RefreshToken> refreshToken = refreshTokenService.findRefreshToken(tokenstr);
        Long memberId = refreshToken
                .orElseThrow( () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND))
                .getMemberId();

        // Todo : view implementation needed : only registered member can increase view value.

        Product product = productService.findProduct(productId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(
                        productMapper.productToProductResponseWithComment(product, memberId)),
                HttpStatus.OK
        );
    }

    // admins can modify their product
    @PatchMapping("/{product-id}")
    public ResponseEntity patchProducts(@RequestHeader("Refresh") String tokenstr,
                                        @PathVariable("product-id") @Positive Long productId,
                                        @RequestBody @Valid ProductDto.Patch productPatchDto){

        Optional<RefreshToken> refreshToken = refreshTokenService.findRefreshToken(tokenstr);
        Long adminId = refreshToken
                .orElseThrow( () -> new BusinessLogicException(ExceptionCode.ADMIN_NOT_FOUND))
                .getAdminId();

        Product product = productService.updateProduct(productId, productMapper.productPatchDtotoProduct(productPatchDto));
        return new ResponseEntity<>(
                new SingleResponseDto<>(
                        productMapper.productToProductResponse(product)),
                HttpStatus.OK
        );
    }

    // Todo : members can modify their product description

    // admins can delete their product
    @DeleteMapping("/{product-id}")
    public ResponseEntity deleteProduct(@PathVariable("product-id") @Positive Long productId,
                                        @RequestHeader("Refresh") String tokenstr){
        Optional<RefreshToken> refreshToken = refreshTokenService.findRefreshToken(tokenstr);
        Long adminId = refreshToken
                .orElseThrow( () -> new BusinessLogicException(ExceptionCode.ADMIN_NOT_FOUND))
                .getAdminId();

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

    // members can create comment
    @PostMapping("/{product-id}/comments")
    public ResponseEntity postProductComment(@RequestHeader("Refresh") String tokenstr,
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
                productMapper.productToProductResponse(product, memberId)),
                HttpStatus.OK);
    }

    @DeleteMapping("/{product-id}/comments/{product-comment-id}")
    public ResponseEntity deleteProductComment(@RequestHeader("Refresh") String tokenstr,
                                             @PathVariable("product-id") @Positive Long productId,
                                               @PathVariable("product-comment-id")
                                                   @Positive Long productCommentId){
        Product product = productService.findProduct(productId);
        Optional<RefreshToken> refreshToken = refreshTokenService.findRefreshToken(tokenstr);
        Long memberId = refreshToken
                .orElseThrow( () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND))
                .getMemberId();

        productService
                .deleteProductComment(product, memberId, productCommentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // members can use like as a bookmark on a product
    @PostMapping("/{product-id}/like")
    public ResponseEntity postProductLike(@RequestHeader("Refresh") String tokenstr,
                                          @PathVariable("product-id") @Positive Long productId){
        Product product = productService.findProduct(productId);
        Optional<RefreshToken> refreshToken = refreshTokenService.findRefreshToken(tokenstr);
        Long memberId = refreshToken
                .orElseThrow( () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND))
                .getMemberId();

        productService.updateProductLike(product, memberId);
        return new ResponseEntity<>(new SingleResponseDto<>(
                productMapper.productToProductResponse(product, memberId)),
                HttpStatus.OK);
    }
}
