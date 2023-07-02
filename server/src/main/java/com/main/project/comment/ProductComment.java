package com.main.project.comment;

// Todo : Comment entity Implementation

import com.main.project.helper.audit.Auditable;
import com.main.project.member.entity.Member;
import com.main.project.product.entity.Product;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "Comment")
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
    private Member member;

    // Todo : mapping needed
//    @ManyToOne
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
}
