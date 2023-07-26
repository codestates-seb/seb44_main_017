package com.main.project.product.entity;

import com.main.project.member.entity.Member;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.Optional;
import java.util.function.Supplier;

@Entity
@Table(name = "ProductLikeCount")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductLikeCount{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productLikeCountId;

    @OneToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private Integer likeCount = 0;

    public Integer addLikeCount(){
        this.likeCount++;
        return this.getLikeCount();
    }

    public Integer subtractLikeCount(){
        this.likeCount--;
        return this.getLikeCount();
    }

}
