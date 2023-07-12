package com.main.project.product.controller;

import com.main.project.dto.MultiResponseDto;
import com.main.project.dto.queryget;
import com.main.project.exception.businessLogicException.BusinessLogicException;
import com.main.project.exception.businessLogicException.ExceptionCode;
import com.main.project.member.entity.RefreshToken;
import com.main.project.member.service.MemberService;
import com.main.project.member.service.RefreshTokenService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.main.project.product.controller.dto.ProductDto;
import com.main.project.product.entity.Product;
import com.main.project.product.mapper.ProductMapper;
import com.main.project.product.service.ProductService;
import com.main.project.productComment.ProductComment;
import com.main.project.productComment.dto.ProductCommentDto;
import com.main.project.productComment.repository.ProductCommentRepository;
import com.main.project.response.SingleResponseDto;
import com.main.project.utils.UriCreator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
    private final ProductCommentRepository productCommentRepository;

    public ProductController(ProductService productService, ProductMapper productMapper, MemberService memberService, RefreshTokenService refreshTokenService, ProductCommentRepository productCommentRepository) {
        this.productService = productService;
        this.productMapper = productMapper;
        this.refreshTokenService = refreshTokenService;
        this.productCommentRepository = productCommentRepository;
    }

    // admin can post their product.
    @PostMapping
    public ResponseEntity postProduct(@RequestHeader("Refresh") String tokenstr,
                                      @Valid @RequestBody ProductDto.Post productPostDto){
        Optional<RefreshToken> refreshToken = Optional.ofNullable(refreshTokenService.findRefreshToken(tokenstr));
        Long adminId = refreshToken
                .orElseThrow( () -> new BusinessLogicException(ExceptionCode.ADMIN_NOT_FOUND))
                .getAdminId();
        Product product = productService
                .createProduct(productMapper.productPostDtoToProduct(productPostDto), adminId);
        URI location = UriCreator.createUri(PRODUCT_DEF_URL, product.getProductId());
        return ResponseEntity.created(location).build();
    }

    @PostMapping("/deny/{product-id}")
    public ResponseEntity productdeny(@PathVariable("product-id") @Positive Long productId,
                                      @Valid @RequestBody ProductDto.Postdeny requestbody){
        productService.denyProduct(productId,requestbody.getDenycontent());
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/postlist")
    public ResponseEntity postProductlist(@RequestPart("files") List<MultipartFile> files,
                                          @RequestParam("productlist") String productlist) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper().registerModule(new SimpleModule());
        List<ProductDto.UserPP> productlists = objectMapper.readValue(productlist, new TypeReference<>() {});
        for(int i = 0; i < productlists.size(); i++){
            Product pp = productMapper.NproductPatchDtotoProduct(productlists.get(i));
            productService.createProducts(pp);
            productService.uploadImage(files.get(i),pp.getProductId());
        }
        return new ResponseEntity(HttpStatus.OK);
    }

    // members can get products list
    @GetMapping
    public ResponseEntity getProducts(
//            @RequestHeader(value = "Refresh", required = false) String tokenstr,
            @Positive @RequestParam int page,
            @Positive @RequestParam int size,
            @RequestParam(required = false, defaultValue = "") String sort,
            @RequestParam(required = false) Boolean issell){

        if (issell != null) {
            // when issell is not null...

            Page<queryget.product> pageProducts = productService
                    .findProducts(page-1, size, issell, sort);
            List<queryget.product> products = pageProducts.getContent();
            return ResponseEntity.ok(new MultiResponseDto(products, pageProducts));

        } else {
            // when issell property is not given

            Page<queryget.product> pageProducts = productService
                    .findProducts(page-1, size, sort);
            List<queryget.product> products = pageProducts.getContent();

            return ResponseEntity.ok(new MultiResponseDto<>(products, pageProducts));
        }


    }

    // members can get product information
    @GetMapping("/{product-id}")
    public ResponseEntity getProduct(@RequestHeader(value = "Refresh", required = false)
                                     String tokenstr,
                                     @PathVariable("product-id") @Positive Long productId){
        Optional<RefreshToken> refreshToken = refreshTokenService.findRefreshTokenOptional(tokenstr);
//        RefreshToken RT = refreshToken.get();

        Product product = productService.findProduct(productId);

        List<ProductComment> comments = productCommentRepository.findByProductProductId(productId);

        List<ProductCommentDto.Response> commentResponses = comments.stream()
                .map(comment -> new ProductCommentDto.Response(
                        comment.getContent(),
                        comment.getMember().getMemberId(),
                        comment.getCreateAt(),
                        comment.getModifyAt()
                ))
                .collect(Collectors.toList());

        ProductDto.ResponseWithComments response;


        if(refreshToken.isEmpty()){
            response = productMapper.productToProductResponseWithComment(product);
        }
        else if (refreshToken.get().getMemberId() != null) {
            Long memberId = refreshToken
                    .orElseThrow( () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND))
                    .getMemberId();
            product.addView();
            productService.updateProduct(productId , product);
            response = productMapper.productToProductResponseWithComment(product, memberId);

        }else if(refreshToken.get().getAdminId() != null){
            Long AdminId = refreshToken
                    .orElseThrow( () -> new BusinessLogicException(ExceptionCode.ADMIN_NOT_FOUND))
                    .getAdminId();
            response = productMapper.productToProductResponseWithComment(product);
        }else{
            response = productMapper.productToProductResponseWithComment(product);
        }

        response.setComments(commentResponses);

        return new ResponseEntity<>(
                new SingleResponseDto<>(
                        response),
                HttpStatus.OK
        );
    }

    // admins can modify their product
    @PatchMapping("/{product-id}")
    public ResponseEntity patchProducts(@RequestHeader("Refresh") String tokenstr,
                                        @PathVariable("product-id") @Positive Long productId,
                                        @RequestBody @Valid ProductDto.Patch productPatchDto){

        Optional<RefreshToken> refreshToken = Optional.ofNullable(refreshTokenService.findRefreshToken(tokenstr));
        RefreshToken RT = refreshToken.get();

        List<ProductComment> comments = productCommentRepository.findByProductProductId(productId);

        List<ProductCommentDto.Response> commentResponses = comments.stream()
                .map(comment -> new ProductCommentDto.Response(
                        comment.getContent(),
                        comment.getMember().getMemberId(),
                        comment.getCreateAt(),
                        comment.getModifyAt()
                ))
                .collect(Collectors.toList());

        ProductDto.ResponseWithComments response;

        if (RT.getMemberId() != null) {
            // members can modify their product description
            Long memberId = refreshToken
                    .orElseThrow( () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND))
                    .getMemberId();
            if(productService.findProduct(productId).getMember().getMemberId() == memberId) {
                Product product = productService.updateProduct(productId, productMapper.productPatchDtotoProduct(productPatchDto));
                response = productMapper.productToProductResponseWithComment(product, memberId);
            }
            throw new BusinessLogicException(ExceptionCode.NOT_WRITER);
        }else if(RT.getAdminId() != null){
            Long AdminId = refreshToken
                    .orElseThrow( () -> new BusinessLogicException(ExceptionCode.ADMIN_NOT_FOUND))
                    .getAdminId();
            Product product = productService.updateProduct(productId, productMapper.productPatchDtotoProduct(productPatchDto));
            response = productMapper.productToProductResponseWithComment(product);
        }else{
            throw new BusinessLogicException(ExceptionCode.REFRESH_NOT_FOUND);
        }

        response.setComments(commentResponses);
        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }


    // admins can delete their product
    @DeleteMapping("/{product-id}")
    public ResponseEntity deleteProduct(@PathVariable("product-id") @Positive Long productId,
                                        @RequestHeader("Refresh") String tokenstr){
        Optional<RefreshToken> refreshToken = Optional.ofNullable(refreshTokenService.findRefreshToken(tokenstr));
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
        Optional<RefreshToken> refreshToken = Optional.ofNullable(refreshTokenService.findRefreshToken(tokenstr));
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
        Optional<RefreshToken> refreshToken = Optional.ofNullable(refreshTokenService.findRefreshToken(tokenstr));
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
        Optional<RefreshToken> refreshToken = Optional.ofNullable(refreshTokenService.findRefreshToken(tokenstr));
        Long memberId = refreshToken
                .orElseThrow( () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND))
                .getMemberId();

        productService.updateProductLike(product, memberId);
        return new ResponseEntity<>(new SingleResponseDto<>(
                productMapper.productToProductResponse(product, memberId)),
                HttpStatus.OK);
    }
}
