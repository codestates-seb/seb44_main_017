package com.main.project.product.entity;

import com.main.project.member.entity.Member;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "Productdeny")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Productdeny {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productdenyId;

    @OneToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    private String denycontent;
}
