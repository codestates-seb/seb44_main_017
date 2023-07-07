package com.main.project.product.controller;

import com.main.project.product.dto.ProductDto;
import com.main.project.product.entity.Product;
import com.main.project.product.entity.Productdeny;
import com.main.project.product.mapper.ProductMapper;
import com.main.project.product.repository.ProductdenyRepository;
import com.main.project.product.service.ProductService;
import com.main.project.product.service.ProductdenyService;
import com.main.project.response.ListResponseDto;
import com.main.project.response.SingleResponseDto;
import com.main.project.utils.UriCreator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

//@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/products")
@Validated
@Slf4j
public class ProductController {
    private final static String PRODUCT_DEF_URL = "/products";

    private final ProductService productService;
    private final ProductMapper productMapper;

    private final ProductdenyService productdenyService;

    public ProductController(ProductService productService, ProductMapper productMapper, ProductdenyService productdenyService) {
        this.productService = productService;
        this.productMapper = productMapper;
        this.productdenyService = productdenyService;
    }

    // admin can post their product.
    @PostMapping
    public Product postProduct(@Valid @RequestBody ProductDto.Post productPostDto){
        Product product = productService.createProduct(productMapper.productPostDtoToProduct(productPostDto));
        URI location = UriCreator.createUri(PRODUCT_DEF_URL, product.getProductId());
        return product;
    }

    @PostMapping("/deny/{product-id}")
    public ResponseEntity productdeny(@PathVariable("product-id") @Positive Long productId,
                                      @Valid @RequestBody String content){
        productService.denyProduct(productId,content);
        return new ResponseEntity(HttpStatus.OK);
    }
    /*
    @PostMapping("/postlist")
    public Product postProduct(@Valid @RequestBody )


     */
    // members can get products list
    @GetMapping
    public ResponseEntity getProducts(){
        List<Product> products = productService.findProducts();
        return new ResponseEntity<>(
                new ListResponseDto<>(
                        productMapper.productsToProductResponses(products)),
                        HttpStatus.OK
                );
    }

    // members can get product information
    @GetMapping("/{product-id}")
    public ResponseEntity getProducts(@PathVariable("answer-id") @Positive Long productId){
        Product product = productService.findProduct(productId);
        return new ResponseEntity<>(
                new SingleResponseDto<>(
                        productMapper.productToProductResponse(product)),
                HttpStatus.OK
        );
    }

    @PatchMapping("/deny/{product-id}")
    public ResponseEntity patchdenyproduct(@PathVariable("product-id") @Positive Long productId,
                                           @RequestBody @Valid ProductDto.UserPP requestbody){
        Product product = productService.updateProduct(productId, productMapper.NproductPatchDtotoProduct(requestbody));
        productdenyService.deleteproductdeny(product);
        return new ResponseEntity<>(
                new SingleResponseDto<>(
                        productMapper.productToProductResponse(product)),
                HttpStatus.OK
        );
    }

    // admins can modify their product
    @PatchMapping("/{product-id}")
    public ResponseEntity patchProducts(@PathVariable("answer-id") @Positive Long productId,
                                        @RequestBody @Valid ProductDto.Patch productPatchDto){

        Product product = productService.updateProduct(productId, productMapper.productPatchDtotoProduct(productPatchDto));
        return new ResponseEntity<>(
                new SingleResponseDto<>(
                        productMapper.productToProductResponse(product)),
                HttpStatus.OK
        );
    }

    // admins can delete their product
    @DeleteMapping("/{product-id}")
    public ResponseEntity deleteProduct(@PathVariable("answer-id") @Positive Long productId){
        productService.deleteProduct(productId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
