package com.main.project.order.service;


import com.main.project.dto.queryget;
import com.main.project.exception.businessLogicException.BusinessLogicException;
import com.main.project.exception.businessLogicException.ExceptionCode;
import com.main.project.member.entity.Member;
import com.main.project.member.repository.MemberRepository;
import com.main.project.member.service.MemberService;
import com.main.project.order.dto.KakaoPayApprovalVO;
import com.main.project.order.dto.KakaoPayReadyVO;
import com.main.project.order.entity.Order;
import com.main.project.order.repository.OrderRepository;
import com.main.project.product.entity.Product;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@Service
@Log
@RequiredArgsConstructor
public class KakaoPay {
    private static final String HOST = "https://kapi.kakao.com";

    @Getter
    @Value("${jwt.admin-key}")
    private String AdminKey;
    private KakaoPayReadyVO kakaoPayReadyVO;
    private KakaoPayApprovalVO kakaoPayApprovalVO;
    private final OrderRepository orderRepository;
    private final MemberRepository memberRepository;
    private final MemberService memberService;

    public String kakaoPayReadybucket(List<queryget.orderproductlist> productList, Order order, String nproductlist) {
        String productname;
        if(productList.size() == 0){
            throw new BusinessLogicException(ExceptionCode.NO_PRODUCTS);
        }
        if(order.getMember().getMoney() < order.getPointspend()){
            throw new BusinessLogicException(ExceptionCode.NOT_ENOUGH_POINT);
        }
        Member member = memberService.findVerifiedMember(order.getMember().getMemberId());
        member.setMoney(member.getMoney() - order.getPointspend());
        memberRepository.save(member);

        productname = productList.get(0).getname() + " 외" + (productList.size()-1);
        RestTemplate restTemplate = new RestTemplate();

        // 서버로 요청할 Header
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "KakaoAK " + AdminKey);
        headers.add("Accept", MediaType.APPLICATION_JSON_UTF8_VALUE);
        headers.add("Content-Type", MediaType.APPLICATION_FORM_URLENCODED_VALUE + ";charset=UTF-8");

        // 서버로 요청할 Body
        MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>();
        params.add("cid", "TC0ONETIME");
        params.add("partner_order_id", String.valueOf(order.getOrderId()));
        params.add("partner_user_id", order.getMember().getEmail());
        params.add("item_name", productname);
        params.add("item_code", nproductlist);
        params.add("quantity", String.valueOf(productList.size()));
        params.add("total_amount", String.valueOf(order.getMoneycount()-order.getPointspend()));
        params.add("tax_free_amount", "100");
        params.add("approval_url", "http://ec2-43-200-107-103.ap-northeast-2.compute.amazonaws.com:8080/kakaoPaySuccess");
        params.add("cancel_url", "http://ec2-43-200-107-103.ap-northeast-2.compute.amazonaws.com:8080/kakaoPayCancel");
        params.add("fail_url", "http://ec2-43-200-107-103.ap-northeast-2.compute.amazonaws.com:8080/kakaoPaySuccessFail");

        HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<MultiValueMap<String, String>>(params, headers);

        try {
            kakaoPayReadyVO = restTemplate.postForObject(new URI(HOST + "/v1/payment/ready"), body, KakaoPayReadyVO.class);

            log.info("" + kakaoPayReadyVO);
            order.setTid(kakaoPayReadyVO.getTid());
            orderRepository.save(order);

            return kakaoPayReadyVO.getNext_redirect_pc_url();

        } catch (RestClientException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (URISyntaxException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return "/error";

    }
    public String kakaoPayReady(List<Product> productList, Order order) {
        String productname;
        if(productList.size() == 0){
            throw new BusinessLogicException(ExceptionCode.NO_PRODUCTS);
        }
        productname = productList.get(0).getName();

        RestTemplate restTemplate = new RestTemplate();

        // 서버로 요청할 Header
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "KakaoAK " + AdminKey);
        headers.add("Accept", MediaType.APPLICATION_JSON_UTF8_VALUE);
        headers.add("Content-Type", MediaType.APPLICATION_FORM_URLENCODED_VALUE + ";charset=UTF-8");

        // 서버로 요청할 Body
        MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>();
        params.add("cid", "TC0ONETIME");
        params.add("partner_order_id", String.valueOf(order.getSingleorder()));
        params.add("partner_user_id", order.getMember().getEmail());
        params.add("item_name", productname);
        params.add("item_code", "single");
        params.add("quantity", String.valueOf(productList.size()));
        params.add("total_amount", String.valueOf(order.getMoneycount()-order.getPointspend()));
        params.add("tax_free_amount", "100");
        params.add("approval_url", "http://ec2-43-200-107-103.ap-northeast-2.compute.amazonaws.com:8080/kakaoPaySuccess");
        params.add("cancel_url", "http://ec2-43-200-107-103.ap-northeast-2.compute.amazonaws.com:8080/kakaoPayCancel");
        params.add("fail_url", "http://ec2-43-200-107-103.ap-northeast-2.compute.amazonaws.com:8080/kakaoPaySuccessFail");

        HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<MultiValueMap<String, String>>(params, headers);

        try {
            kakaoPayReadyVO = restTemplate.postForObject(new URI(HOST + "/v1/payment/ready"), body, KakaoPayReadyVO.class);

            log.info("" + kakaoPayReadyVO);
            order.setTid(kakaoPayReadyVO.getTid());
            orderRepository.save(order);
            return kakaoPayReadyVO.getNext_redirect_pc_url();

        } catch (RestClientException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (URISyntaxException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return "/error";

    }
    public KakaoPayApprovalVO kakaoPayInfo(String pg_token) {

        queryget.findbyorderid orderid = orderRepository.findByTid(kakaoPayReadyVO.getTid());
        Optional<Order> Optionalorder = orderRepository.findById(orderid.getorder_id());
        Order order = Optionalorder.get();
        order.setPayed(true);
        orderRepository.save(order);

        log.info("KakaoPayInfoVO............................................");
        log.info("-----------------------------");

        RestTemplate restTemplate = new RestTemplate();

        // 서버로 요청할 Header
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "KakaoAK " + AdminKey);
        headers.add("Accept", MediaType.APPLICATION_JSON_UTF8_VALUE);
        headers.add("Content-Type", MediaType.APPLICATION_FORM_URLENCODED_VALUE + ";charset=UTF-8");

        // 서버로 요청할 Body
        MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>();
        params.add("cid", "TC0ONETIME");
        params.add("tid", kakaoPayReadyVO.getTid());
        if(order.getSingleorder() != 0){
            params.add("partner_order_id", String.valueOf(order.getSingleorder()));
        }
        else{
            params.add("partner_order_id", String.valueOf(order.getOrderId()));
        }
        params.add("partner_user_id", order.getMember().getEmail());
        params.add("pg_token", pg_token);
        params.add("total_amount", String.valueOf(order.getMoneycount()-order.getPointspend()));

        HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<MultiValueMap<String, String>>(params, headers);


        try {
            kakaoPayApprovalVO = restTemplate.postForObject(new URI(HOST + "/v1/payment/approve"), body, KakaoPayApprovalVO.class);
            log.info("" + kakaoPayApprovalVO);

            return kakaoPayApprovalVO;

        } catch (RestClientException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (URISyntaxException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return null;
    }

}
