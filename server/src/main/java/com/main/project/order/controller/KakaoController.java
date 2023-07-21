package com.main.project.order.controller;

import com.main.project.alarm.entity.Alarm;
import com.main.project.alarm.repository.AlarmRepository;
import com.main.project.alarm.service.SseService;
import com.main.project.dto.queryget;
import com.main.project.exception.businessLogicException.BusinessLogicException;
import com.main.project.exception.businessLogicException.ExceptionCode;
import com.main.project.member.dto.MemberDto;
import com.main.project.member.entity.Member;
import com.main.project.member.entity.RefreshToken;
import com.main.project.member.repository.MemberRepository;
import com.main.project.member.repository.RefreshTokenRepository;
import com.main.project.member.service.MemberService;
import com.main.project.order.dto.KakaoPayApprovalVO;
import com.main.project.order.dto.KakaoPayReadyVO;
import com.main.project.order.dto.OrderDto;
import com.main.project.order.entity.Order;
import com.main.project.order.entity.Orderproduct;
import com.main.project.order.mapper.OrderMapper;
import com.main.project.order.repository.OrderproductRepository;
import com.main.project.order.service.KakaoPay;
import com.main.project.order.service.OrderService;
import com.main.project.order.service.OrderproductService;
import com.main.project.product.entity.Product;
import com.main.project.product.mapper.ProductMapper;
import com.main.project.product.repository.ProductRepository;
import com.main.project.product.service.ProductService;
import com.main.project.search.document.Eproduct;
import com.main.project.search.service.EproductService;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Log
@Controller
@RequiredArgsConstructor
public class KakaoController {
    private final ProductService productService;
    private final MemberService memberService;
    private final OrderService orderService;
    private final OrderMapper orderMapper;
    private final RefreshTokenRepository refreshTokenRepository;
    private final OrderproductRepository orderproductRepository;
    private final OrderproductService orderproductService;
    private final MemberRepository memberRepository;
    private final EproductService eproductService;
    private final ProductMapper productMapper;
    private final SseService sseService;

    private final ProductRepository productRepository;

    //@Setter(onMethod_ = @Autowired)
    //private KakakoPay kakaopay;
    private final KakaoPay kakaopay;



    @PostMapping("/kakaoPaybucket")
    public ResponseEntity kakaoPaybucket(@RequestHeader(name = "Refresh") String token,
                                 @Valid @RequestBody OrderDto.Post requestBody){
        Long memberId = findmemberId(token);
        Member member = memberService.findVerifiedMember(memberId);
        List<queryget.orderproductlist> productList = orderproductRepository.getorderproductlist(memberId);
        if(productList.size() == 0){
            throw new BusinessLogicException(ExceptionCode.NO_PRODUCTS);
        }
        Order order = orderMapper.orderPostToOrder(requestBody);
        int sum = 0;
        for(int i = 0; i < productList.size(); i++){
            sum += productList.get(i).getprice();
        }
        Order createdorder = orderService.createOrder(order,member,sum,Long.valueOf(0));
        return ResponseEntity.ok(kakaopay.kakaoPayReadybucket(productList, createdorder));
    }

    @PostMapping("/kakaoPay/{product-id}")
    public ResponseEntity kakaoPay(@RequestHeader(name = "Refresh") String token,
                                           @PathVariable("product-id") @Positive Long productId,
                                           @Valid @RequestBody OrderDto.Post requestBody) {
        Long memberId = findmemberId(token);
        Member member = memberService.findVerifiedMember(memberId);
        Product product = productService.findProduct(productId);
        List<Product> productList = new ArrayList<>();
        productList.add(product);
        Order order = orderMapper.orderPostToOrder(requestBody);
        int sum = 0;
        for(int i = 0; i < productList.size(); i++){
            sum += productList.get(i).getPrice();
        }
        Order createdorder = orderService.createOrder(order,member,sum, product.getProductId());

        return ResponseEntity.ok(kakaopay.kakaoPayReady(productList, createdorder));

    }

    @GetMapping("/kakaoPaySuccess")
    public void kakaoPaySuccess(@RequestParam("pg_token") String pg_token, Model model) {
        log.info("kakaoPaySuccess get............................................");
        log.info("kakaoPaySuccess pg_token : " + pg_token);
        KakaoPayApprovalVO kakaoPayApprovalVO = kakaopay.kakaoPayInfo(pg_token);
        Member member = memberService.findMember(kakaoPayApprovalVO.getPartner_user_id());
        if(kakaoPayApprovalVO.getItem_code().equals("single")){
            // change product state
            Product product = productService.findProduct(Long.valueOf(kakaoPayApprovalVO.getPartner_order_id()));
            product.setIssell(true);
            productRepository.save(product);
            // sava point
            Member seller = memberService.findVerifiedMember(product.getMember().getMemberId());
            seller.setMoney(seller.getMoney() + product.getPrice()*10/100);
            memberRepository.save(seller);
            sseService.addalarm(seller, product);
            // delete product in other user bucket & add in buy list

            orderproductService.createOpforsingle(member, product);
            List<queryget.findbyorderpid> orderproductIdList = orderproductService.findOrderproductdelete(member.getMemberId(),product.getProductId());
            orderproductIdList.forEach(orderproductId -> {
                Orderproduct orderproduct = orderproductService.findorderproduct(orderproductId.getorderproduct_id());
                orderproductRepository.delete(orderproduct);
            });
        }
        else{
            List<queryget.findbypid> productIdList = orderproductRepository.findAllByMemberId(member.getMemberId());
            productIdList.forEach(productId -> {
                Product product = productService.findProduct(productId.getproduct_id());
                product.setIssell(true);
                productRepository.save(product);
                Member seller = memberService.findVerifiedMember(product.getMember().getMemberId());
                seller.setMoney(seller.getMoney() + product.getPrice()*10/100);
                memberRepository.save(seller);
                sseService.addalarm(seller, product);
                List<queryget.findbyorderpid> orderproductIdList = orderproductService.findOrderproductdelete(member.getMemberId(),product.getProductId());
                orderproductIdList.forEach(orderproductId -> {
                    Orderproduct orderproduct = orderproductService.findorderproduct(orderproductId.getorderproduct_id());
                    orderproductRepository.delete(orderproduct);
                });
            });
        }

        model.addAttribute("info", kakaoPayApprovalVO);
    }

    @GetMapping("/kakaoPayCancel")
    public void cancel() {

        throw new BusinessLogicException(ExceptionCode.PAY_CANCEL);
    }

    @GetMapping("/kakaoPaySuccessFail")
    public void fail() {

        throw new BusinessLogicException(ExceptionCode.PAY_FAILED);
    }

    public Long findmemberId(String token) {
        Optional<RefreshToken> refresht = refreshTokenRepository.findByValue(token);
        RefreshToken findtoken = refresht.orElseThrow(()-> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return findtoken.getMemberId();
    }
}
