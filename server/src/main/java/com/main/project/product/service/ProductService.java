package com.main.project.product.service;

import com.main.project.exception.businessLogicException.BusinessLogicException;
import com.main.project.exception.businessLogicException.ExceptionCode;
import com.main.project.member.service.MemberService;
import com.main.project.product.entity.Product;
import com.main.project.product.entity.Productdeny;
import com.main.project.product.repository.ProductRepository;
import com.main.project.s3.service.AwsS3Service;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

// Service Layer Implementation
@Service
@Transactional
public class ProductService {
    private final ProductRepository productRepository;
    private final MemberService memberService;
    private final ProductdenyService productdenyService;
    private final AwsS3Service awsS3Service;

    public ProductService(ProductRepository productRepository, MemberService memberService, ProductdenyService productdenyService, AwsS3Service awsS3Service) {
        this.productRepository = productRepository;
        this.memberService = memberService;
        this.productdenyService = productdenyService;
        this.awsS3Service = awsS3Service;
    }

    public List<Product> findProducts() {
        return productRepository.findAll();
    }

    public Product findProduct(Long productId) {
        Optional<Product> product = productRepository.findById(productId);
        return product.orElseThrow(() -> new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND));
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public void createProducts(Product product) {
        productRepository.save(product);
    }

    public Product updateProduct(Long productId, Product product) {
        Product findProduct = findProduct(productId);
        Optional.ofNullable(product.getName()).ifPresent(findProduct::setName);
        Optional.ofNullable(product.getTitle()).ifPresent(findProduct::setTitle);
        Optional.ofNullable(product.getContent()).ifPresent(findProduct::setContent);
        Optional.ofNullable(product.getPrice()).ifPresent(findProduct::setPrice);
        Optional.ofNullable(product.getImageLink()).ifPresent(findProduct::setImageLink);
        Optional.ofNullable(product.getCondition_value()).ifPresent(findProduct::setCondition_value);
        Optional.ofNullable(product.getCategory()).ifPresent(findProduct::setCategory);
        Optional.ofNullable(product.getIssell()).ifPresent(findProduct::setIssell);

        return productRepository.save(findProduct);
    }

    public void deleteProduct(Long productId) {
        Product findProduct = findProduct(productId);
        productRepository.delete(findProduct);
    }

    public void denyProduct(Long productId, String content){
        Optional<Product> optionalProduct = productRepository.findById(productId);
        Product findproduct = optionalProduct.orElseThrow(()->new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND));
        if(productdenyService.findByproductId(findproduct) == true) {
            throw new BusinessLogicException(ExceptionCode.PRODUCTDENY_EXISTS);
        }
        Productdeny productdeny = new Productdeny();
        productdeny.setDenycontent(content);
        productdeny.setProduct(findproduct);
        productdeny.setMember(findproduct.getMember());
        productdenyService.addProductdeny(productdeny);
    }

    public void uploadImage(MultipartFile multipartFile, Long productId){
        Optional<Product> optionalProduct = productRepository.findById(productId);
        Product pm = optionalProduct.orElseThrow(()->new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND));
        String fileName = awsS3Service.uploadSingleImage(multipartFile);
        Optional.ofNullable(fileName).ifPresent(imagelink ->pm.setImageLink(fileName));
        productRepository.save(pm);
    }
}
