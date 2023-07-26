package com.main.project.order.controller;

import com.main.project.dto.MultiResponseDto;
import com.main.project.dto.queryget;
import com.main.project.dto.queryresponse.ProductResponse;
import com.main.project.exception.businessLogicException.BusinessLogicException;
import com.main.project.exception.businessLogicException.ExceptionCode;
import com.main.project.member.entity.Member;
import com.main.project.member.entity.RefreshToken;
import com.main.project.member.repository.RefreshTokenRepository;
import com.main.project.member.service.MemberService;
import com.main.project.order.entity.Orderproduct;
import com.main.project.order.service.OrderproductService;
import com.main.project.product.entity.Product;
import com.main.project.product.service.ProductService;
import com.main.project.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/orderproducts")
@Slf4j
@RequiredArgsConstructor
public class OrderproductController {
    private final static String ORDER_DEFAULT_URL = "/orderproducts";
    private final ProductService productService;
    private final MemberService memberService;
    private final OrderproductService orderproductService;
    private final RefreshTokenRepository refreshTokenRepository;

    @PostMapping("/{product-id}")
    public ResponseEntity orderproduct(@RequestHeader(name = "Refresh") String token,
                                       @PathVariable("product-id") @Positive Long productId){
        Long memberId = findmemberId(token);
        Member member = memberService.findVerifiedMember(memberId);
        Product product = productService.findProduct(productId);
        Orderproduct orderproduct = orderproductService.createorderproduct(member,product);

        URI location = UriCreator.createUri(ORDER_DEFAULT_URL, orderproduct.getOrderproductId());
        return ResponseEntity.created(location).build();
    }

    @GetMapping("/bucket")
    public ResponseEntity userbucket(@RequestHeader(name = "Refresh") String token,
                                     @Positive @RequestParam int page,
                                     @Positive @RequestParam int size,
                                     @RequestParam(required = false) String sort){
        Long memberId = findmemberId(token);
        Page<ProductResponse> ss = orderproductService.getOrderProduct(Long.valueOf(memberId),page-1,size,sort,false);
        List<ProductResponse> productList = ss.getContent();
        return ResponseEntity.ok(new MultiResponseDto(productList,ss));
    }

    @GetMapping("/buybucket")
    public ResponseEntity userbuybucket(@RequestHeader(name = "Refresh") String token,
                                     @Positive @RequestParam int page,
                                     @Positive @RequestParam int size,
                                     @RequestParam(required = false) String sort){
        Long memberId = findmemberId(token);
        Page<ProductResponse> ss = orderproductService.getOrderProduct(Long.valueOf(memberId),page-1,size,sort,true);
        List<ProductResponse> productList = ss.getContent();
        return ResponseEntity.ok(new MultiResponseDto(productList,ss));
    }

    @DeleteMapping("/{product-id}")
    public ResponseEntity deleteorderproduct(@RequestHeader(name = "Refresh") String token,
                                             @PathVariable("product-id") @Positive long productId){
        Long memberId = findmemberId(token);
        orderproductService.deleteorderproduct(memberId,productId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    public Long findmemberId(String token) {
        Optional<RefreshToken> refresht = refreshTokenRepository.findByValue(token);
        RefreshToken findtoken = refresht.orElseThrow(()-> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findtoken.getMemberId();
    }
}
