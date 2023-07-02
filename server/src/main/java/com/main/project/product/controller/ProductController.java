package com.main.project.product.controller;

import com.main.project.product.dto.ProductDto;
import com.main.project.product.entity.Product;
import com.main.project.product.mapper.ProductMapper;
import com.main.project.product.service.ProductService;
import com.main.project.response.ListResponseDto;
import com.main.project.response.SingleResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/products")
@Validated
@Slf4j
public class ProductController {
    private final static String PRODUCT_DEF_URL = "/products";

    private final ProductService productService;
    private final ProductMapper productMapper;

    public ProductController(ProductService productService, ProductMapper productMapper) {
        this.productService = productService;
        this.productMapper = productMapper;
    }

    // admin can post their product.
//    @PostMapping
//    public ResponseEntity postProduct(@Valid @RequestBody ProductDto.Post productPostDto){
//        Product product = productService.createProduct(productMapper.productPostDtoToProduct(productPostDto));
//        return null;
//    }

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
}
