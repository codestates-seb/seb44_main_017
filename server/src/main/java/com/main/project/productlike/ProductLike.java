package com.main.project.productlike;

// Todo : Entity implementation

import com.main.project.member.entity.Member;
import com.main.project.product.entity.Product;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "ProductLike")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ProductLikeId;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    private boolean liked;

}
