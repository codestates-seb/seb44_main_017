package com.main.project.product.service;

import com.main.project.admin.entity.Admin;
import com.main.project.admin.service.AdminService;
import com.main.project.dto.queryget;
import com.main.project.member.entity.Member;
import com.main.project.exception.businessLogicException.BusinessLogicException;
import com.main.project.exception.businessLogicException.ExceptionCode;
import com.main.project.member.entity.RefreshToken;
import com.main.project.member.service.MemberService;
import com.main.project.product.controller.dto.ProductDto;
import com.main.project.product.entity.Product;
import com.main.project.product.entity.Productdeny;
import com.main.project.product.mapper.ProductMapper;
import com.main.project.product.repository.ProductLikeCountRepository;
import com.main.project.product.repository.ProductRepository;
import com.main.project.productComment.ProductComment;
import com.main.project.productComment.repository.ProductCommentRepository;
import com.main.project.search.document.Eproduct;
import com.main.project.search.service.EproductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import com.main.project.s3.service.AwsS3Service;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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
    private final ProductdenyService productdenyService;
    private final AwsS3Service awsS3Service;
    private final ProductLikeCountService productLikeCountService;
    private final ProductLikeCountRepository productLikeCountRepository;

    private final EproductService eproductService;

    private final ProductMapper mapper;

    public ProductService(ProductRepository productRepository, MemberService memberService, ProductCommentRepository productCommentRepository
            , AdminService adminService, ProductdenyService productdenyService, AwsS3Service awsS3Service
            , ProductLikeCountService productLikeCountService, ProductLikeCountRepository productLikeCountRepository, ProductMapper mapper, EproductService eproductService) {
        this.productRepository = productRepository;
        this.memberService = memberService;
        this.productCommentRepository = productCommentRepository;
        this.adminService = adminService;
        this.productdenyService = productdenyService;
        this.awsS3Service = awsS3Service;
        this.productLikeCountService = productLikeCountService;
        this.productLikeCountRepository = productLikeCountRepository;
        this.mapper = mapper;
        this.eproductService = eproductService;
    }

    public Page<Product> findProducts(int page, int size) {
        return productRepository.findAll(PageRequest.of(page, size, Sort.by("productId").descending()));
    }

    public Product findProduct(Long productId) {
        Optional<Product> product = productRepository.findById(productId);
        return product.orElseThrow(() -> new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND));
    }

    public Product createProduct(Product product, Long adminId) {
        Admin findAdmin = adminService.findAdminById(adminId);
        product.setAdmin(findAdmin);
        productLikeCountService.createProductLikeCount(product);
        product.setProductlike(0);
        Product saveproduct = productRepository.save(product);
        Eproduct eproduct = mapper.productToEproduct(saveproduct);
        eproduct.setSell("sale");
        eproductService.addEproduct(eproduct);
        return saveproduct;
    }

    public void createProducts(Product product, Long memberId) {
        Member member = memberService.findVerifiedMember(memberId);
        product.setMember(member);
        productLikeCountService.createProductLikeCount(product);
        product.setProductlike(0);
        product.setPrice(0);
        product.setIssell(false);
        product.setView(0);
        Product saveproduct = productRepository.save(product);

        Eproduct eproduct = mapper.productToEproduct(saveproduct);
        eproduct.setSell("wait");
        eproductService.addEproduct(eproduct);
    }

    public Product updatedenyProduct(List<ProductDto.UserPP> productlists, Long productId){
        Product product = mapper.NproductPatchDtotoProduct(productlists.get(0));
        Product findproduct = findProduct(productId);
        Optional.ofNullable(product.getName()).ifPresent(findproduct::setName);
        Optional.ofNullable(product.getContent()).ifPresent(findproduct::setContent);
        Optional.ofNullable(product.getCategory()).ifPresent(findproduct::setCategory);
        findproduct.setAdmin(null);
        productdenyService.deleteproductdeny(findproduct);
        return productRepository.save(findproduct);

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
        Optional.ofNullable(product.getView()).ifPresent(findProduct::setView);
        Product saveproduct = productRepository.save(findProduct);
        Eproduct eproduct = mapper.productToEproduct(saveproduct);
        eproduct.setSell("sale");
        eproductService.addEproduct(eproduct);
        return saveproduct;
    }
    public Product updateProductview(Long productId, Product product){
        Product findProduct = findProduct(productId);
        Optional.ofNullable(product.getView()).ifPresent(findProduct::setView);
        Product saveproduct = productRepository.save(findProduct);
        Eproduct eproduct = mapper.productToEproduct(saveproduct);
        eproductService.addEproduct(eproduct);
        return saveproduct;
    }

    public void deleteProduct(Long productId) {
        Product findProduct = findProduct(productId);
        productRepository.delete(findProduct);
    }

    public void createProductComment(Product product, Long memberId, ProductComment productComment) {
        Member findMember = memberService.findVerifiedMember(memberId);
        productComment.setProduct(product);
        productComment.setWriter(findMember);
        productCommentRepository.save(productComment);

        findMember.addProductComments(productComment);
        memberService.updateMember(findMember);
    }

    public ProductDto.ResponseWithComments getResponseWithComments(Long productId, Optional<RefreshToken> refreshToken, Product product) {
        ProductDto.ResponseWithComments response;
        if(refreshToken.isEmpty()){
            response = mapper.productToProductResponseWithComment(product);
        }
        else if (refreshToken.get().getMemberId() != null) {
            Long memberId = refreshToken
                    .orElseThrow( () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND))
                    .getMemberId();
            product.addView();
            updateProductview(productId, product);
            response = mapper.productToProductResponseWithComment(product, memberId);

        }else if(refreshToken.get().getAdminId() != null){
            Long AdminId = refreshToken
                    .orElseThrow( () -> new BusinessLogicException(ExceptionCode.ADMIN_NOT_FOUND))
                    .getAdminId();
            response = mapper.productToProductResponseWithComment(product);
        }else{
            response = mapper.productToProductResponseWithComment(product);
        }
        return response;
    }

    public void updateProductComment(Product product, Long memberId, Long productCommentId, ProductComment productComment) {
        Member findMember = memberService.findVerifiedMember(memberId);

        ProductComment findProductComment = productCommentRepository.findById(productCommentId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        Optional.ofNullable(productComment.getContent())
                .ifPresent(findProductComment::setContent);

        if (findMember.hasProductComment(productComment)){
            productCommentRepository.save(findProductComment);
            memberService.updateMember(findMember);
        }
    }

    public void deleteProductComment(Product product, Long memberId, Long productCommentId) {
        Member findMember = memberService.findVerifiedMember(memberId);

        ProductComment productComment = productCommentRepository.findById(productCommentId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        if (findMember.hasProductComment(productComment)){
            findMember.removeProductComments(productComment);
            productCommentRepository.delete(productComment);
            memberService.updateMember(findMember);
        }
    }

    public Page<queryget.product> findProducts(int page, int size,
                                               Boolean issell, String sort) {

        if (issell != null) {
            // Todo : sort properties implementation
            switch (sort){
                case "newest":
                    return productRepository.findByCreatedAtDesc(issell, PageRequest.of(page, size));
                case "oldest":
                    return productRepository.findByCreatedAtAsc(issell, PageRequest.of(page, size));
                case "mostlike":
                    return productRepository.findByLikedMembersDesc(issell, PageRequest.of(page, size));
                case "pricedesc":
                    return productRepository.findByPriceDesc(issell, PageRequest.of(page, size));
                case "priceasc":
                    return productRepository.findByPriceAsc(issell, PageRequest.of(page, size));
                default:
                    throw new BusinessLogicException(ExceptionCode.INVALID_SORT_PARAMETER);
            }

//            return productRepository.findByIssell(issell, PageRequest.of(page, size));
        }

        throw new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND);
    }

    public Page<queryget.product> findProducts(int page, int size,
                                               String sort) {
        // Todo : sort properties implementation

        switch (sort){
            case "newest":
                return productRepository.findByCreatedAtDesc(PageRequest.of(page, size));
            case "oldest":
                return productRepository.findByCreatedAtAsc(PageRequest.of(page, size));
            case "mostlike":
                return productRepository.findByLikedMembersDesc(PageRequest.of(page, size));
            case "pricedesc":
                return productRepository.findByPriceDesc(PageRequest.of(page, size));
            case "priceasc":
                return productRepository.findByPriceAsc(PageRequest.of(page, size));
            default:
                throw new BusinessLogicException(ExceptionCode.INVALID_SORT_PARAMETER);
//            return productRepository.findAll(PageRequest.of(page, size));
        }
    }

    public Product updateProductLike(Product product, Long memberId) {
        Member findMember = memberService.findVerifiedMember(memberId);

        if(product.getLikedByMembers().contains(findMember)){
            product.removeLikeByMembers(findMember);
            findMember.removeLikedProducts(product);

            productLikeCountService.updateProductLikeCount(product, -1);
        }else{
            product.addLikeByMembers(findMember);
            findMember.addLikedProducts(product);

            productLikeCountService.updateProductLikeCount(product, +1);
        }

        Integer productLikeCountVal = productLikeCountService
                .findVerifiedProductLikeCount(product)
                .getLikeCount();
        product.setProductlike(productLikeCountVal);

        memberService.updateMember(findMember);
        Product saveproduct = productRepository.save(product);
        Eproduct eproduct = mapper.productToEproduct(saveproduct);
        eproductService.addEproduct(eproduct);
        return saveproduct;
    }


    public void uploadImage(MultipartFile multipartFile, Long productId){
        Optional<Product> optionalProduct = productRepository.findById(productId);
        Product pm = optionalProduct.orElseThrow(()->new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND));
        String fileName = awsS3Service.uploadSingleImage(multipartFile);
        Optional.ofNullable(fileName).ifPresent(imagelink ->pm.setImageLink(fileName));
        productRepository.save(pm);
    }

    public void denyProduct(Long productId, String content, Admin admin){
        Optional<Product> optionalProduct = productRepository.findById(productId);
        Product findproduct = optionalProduct.orElseThrow(()->new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND));
        if(productdenyService.findByproductId(findproduct) == true) {
            throw new BusinessLogicException(ExceptionCode.PRODUCTDENY_EXISTS);
        }
        findproduct.setAdmin(admin);
        productRepository.save(findproduct);
        Productdeny productdeny = new Productdeny();
        productdeny.setDenycontent(content);
        productdeny.setProduct(findproduct);
        productdeny.setMember(findproduct.getMember());
        productdenyService.addProductdeny(productdeny);
    }


}
