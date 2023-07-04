package com.main.project.product.entity;
import com.main.project.admin.entity.Admin;
import com.main.project.productComment.ProductComment;
import com.main.project.member.entity.Member;
import com.main.project.productlike.ProductLike;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
@Entity
@Table(name = "Product")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    private Admin admin;

    private String name;

    private String title;

    private String content;

    private Integer price = 0;

    private String category;

    private Integer view = 0;

    @OneToMany // one product has many productLike entities
    private List<ProductLike> productLikeList = new ArrayList<>();

//    Todo: image deployment
    private String imageLink;

//    @ColumnDefault("false")
    private Boolean issell = false;

    private LocalDateTime createAt;

    private LocalDateTime modifyAt;

    private Integer condition_value = 5;

    @OneToMany
    private List<ProductComment> comments = new ArrayList<>();
}
