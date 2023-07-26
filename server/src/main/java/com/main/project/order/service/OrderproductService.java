package com.main.project.order.service;

import com.main.project.dto.queryget;
import com.main.project.dto.queryresponse.ProductResponse;
import com.main.project.exception.businessLogicException.BusinessLogicException;
import com.main.project.exception.businessLogicException.ExceptionCode;
import com.main.project.member.entity.Member;
import com.main.project.member.service.MemberService;
import com.main.project.order.entity.Orderproduct;
import com.main.project.order.repository.OrderRepository;
import com.main.project.order.repository.OrderproductQueryRepository;
import com.main.project.order.repository.OrderproductRepository;
import com.main.project.product.entity.Product;
import com.main.project.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderproductService {
    private final OrderproductRepository orderproductRepository;
    private final OrderproductQueryRepository orderproductQueryRepository;
    public Orderproduct createorderproduct(Member member, Product product){

        List<queryget.orderproduct> orderproducts = orderproductRepository.findOrderproduct(member.getMemberId(),product.getProductId());
        if(orderproducts.size() != 0){
            throw new BusinessLogicException(ExceptionCode.PRODUCT_EXISTS);
        }
        if(product.getIssell() == true){
            throw new BusinessLogicException(ExceptionCode.SOLD_OUT);
        }
        Orderproduct orderproduct = new Orderproduct();
        orderproduct.setMember(member);
        orderproduct.setProduct(product);
        return orderproductRepository.save(orderproduct);

    }
    public void createOpforsingle(Member member, Product product){
        List<queryget.orderproduct> orderproducts = orderproductRepository.findOrderproduct(member.getMemberId(),product.getProductId());
        if(orderproducts.size() == 0){
            Orderproduct orderproduct = new Orderproduct();
            orderproduct.setMember(member);
            orderproduct.setProduct(product);
            orderproductRepository.save(orderproduct);
        }
    }
    public Orderproduct findorderproduct(Long orderproductId) {
        Optional<Orderproduct> orderproduct = orderproductRepository.findById(orderproductId);
        return orderproduct.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ORDERPRODUCT_NOT_FOUND));
    }
    public Orderproduct findVerifiedOrderproduct(long memberId,long productId) {
        Optional<Orderproduct> optionalOrderproduct = orderproductRepository.findOrderproductsig(memberId,productId);
        Orderproduct findOrderproduct = optionalOrderproduct.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findOrderproduct;
    }
    public List<queryget.findbyorderpid> findOrderproductdelete(long memberId,long productId) {
        List<queryget.findbyorderpid> Orderproducts = orderproductRepository.findOrderproductdelete(memberId,productId);

        return Orderproducts;
    }
    public void deleteorderproduct(long memberId, long productId) {
        Orderproduct orderproduct = findVerifiedOrderproduct(memberId, productId);
        orderproductRepository.delete(orderproduct);
    }

    public Page<ProductResponse> getOrderProduct(Long memberId, int page, int size, String keyword, boolean issell){

        return orderproductQueryRepository.getOrderProduct(memberId, PageRequest.of(page,size), keyword, issell);
    }

}
