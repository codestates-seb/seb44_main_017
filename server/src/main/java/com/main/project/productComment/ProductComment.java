package com.main.project.productComment;

// Todo : Comment entity Implementation

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.main.project.helper.audit.Auditable;
import com.main.project.member.entity.Member;
import com.main.project.product.entity.Product;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "ProductComment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductComment extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productCommentId;

    private String content;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member writer;

    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "product_id")
    private Product product;
}
