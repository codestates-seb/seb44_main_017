package com.main.project.order.entity;

import com.main.project.member.entity.Member;
import com.main.project.product.entity.Product;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Orderproduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderproductId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

}
