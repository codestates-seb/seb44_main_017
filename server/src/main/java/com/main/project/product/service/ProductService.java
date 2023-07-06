package com.main.project.product.service;

import com.main.project.admin.entity.Admin;
import com.main.project.admin.service.AdminService;
import com.main.project.exception.BusinessLogicException;
import com.main.project.exception.ExceptionCode;
import com.main.project.member.entity.Member;
import com.main.project.member.service.MemberService;
import com.main.project.product.entity.Product;
import com.main.project.product.repository.ProductRepository;
import com.main.project.productComment.ProductComment;
import com.main.project.productComment.repository.ProductCommentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

// Service Layer Implementation
@Service
@Transactional
public class ProductService {
    private final ProductRepository productRepository;
    private final MemberService memberService;
    private final ProductCommentRepository productCommentRepository;
    private final AdminService adminService;

    public ProductService(ProductRepository productRepository, MemberService memberService, ProductCommentRepository productCommentRepository, AdminService adminService) {
        this.productRepository = productRepository;
        this.memberService = memberService;
        this.productCommentRepository = productCommentRepository;
        this.adminService = adminService;
    }

    public Page<Product> findProducts(int page, int size) {
        return productRepository.findAll(PageRequest.of(page, size, Sort.by("productId").descending()));
    }

    public Product findProduct(Long productId) {
        Optional<Product> product = productRepository.findById(productId);
        return product.orElseThrow(() -> new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND));
    }

    public Product createProduct(Product product, Long adminId) {
        Admin findAdmin = adminService.findVerifiedAdmin(adminId);
        product.setAdmin(findAdmin);
        return productRepository.save(product);
    }

    public Product updateProduct(Long productId, Product product) {
        Product findProduct = findProduct(productId);
        Optional.ofNullable(product.getName()).ifPresent(findProduct::setName);
        Optional.ofNullable(product.getTitle()).ifPresent(findProduct::setTitle);
        Optional.ofNullable(product.getContent()).ifPresent(findProduct::setContent);
        Optional.ofNullable(product.getPrice()).ifPresent(findProduct::setPrice);
        Optional.ofNullable(product.getImageLink()).ifPresent(findProduct::setImageLink);
        Optional.ofNullable(product.getConditionValue()).ifPresent(findProduct::setConditionValue);
        Optional.ofNullable(product.getCategory()).ifPresent(findProduct::setCategory);
        Optional.ofNullable(product.getIssell()).ifPresent(findProduct::setIssell);
        Optional.ofNullable(product.getPointValue()).ifPresent(findProduct::setPointValue);

        findProduct.setModifyAt(LocalDateTime.now());
        return productRepository.save(findProduct);
    }

    public void deleteProduct(Long productId) {
        Product findProduct = findProduct(productId);
        productRepository.delete(findProduct);
    }

    public void createProductComment(Product product, Long memberId, ProductComment productComment) {
        Member findMember = memberService.findVerifiedMember(memberId);
        productComment.setProduct(product);
        productComment.setMember(findMember);
        productCommentRepository.save(productComment);
    }

    public void deleteProductComment(Product product, Long memberId, Long productCommentId) {
        Member findMember = memberService.findVerifiedMember(memberId);
        ProductComment productComment = productCommentRepository.findById(productCommentId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        productCommentRepository.delete(productComment);
    }

    public Page<Product> findProducts(int page, int size,
                                      Boolean issell, String sortProperty, Sort.Direction sortDirection) {
        Sort sort = Sort.by(sortDirection, sortProperty);
        if (issell != null) {
            return productRepository.findByIssell(issell, PageRequest.of(page, size, sort));
        } else {
            return productRepository.findAll(PageRequest.of(page, size, sort));
        }
    }

    public Page<Product> findProducts(int page, int size,
                                     String sortProperty, Sort.Direction sortDirection) {
        Sort sort = Sort.by(sortDirection, sortProperty);
        return productRepository.findAll(PageRequest.of(page, size, sort));
    }

    public Product updateProductLike(Product product, Long memberId) {
        Member findMember = memberService.findVerifiedMember(memberId);

        if(product.getLikedByMembers().contains(findMember)){
            product.removeLikeByMembers(findMember);
            findMember.removeLikedProducts(product);
        }else{
            product.addLikeByMembers(findMember);
            findMember.addLikedProducts(product);
        }
        memberService.updateMember(findMember);

        return productRepository.save(product);
    }


}
