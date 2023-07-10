package com.main.project.product.entity;
import com.main.project.admin.entity.Admin;
import com.main.project.comment.ProductComment;
import com.main.project.helper.audit.Auditable;
import com.main.project.member.entity.Member;
import com.main.project.order.entity.Orderproduct;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDate;
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
public class Product extends Auditable {
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

//    @ColumnDefault("0")
    private Integer view = 0;

//    @ColumnDefault("false")
    private Boolean productlike = false;

//    Todo: image deployment
    private String imageLink;

//    @ColumnDefault("false")
    private Boolean issell = false;

    private Integer condition_value = 5;

    @OneToMany
    private List<ProductComment> comments = new ArrayList<>();

    @OneToOne(mappedBy = "product", cascade = CascadeType.REMOVE)
    private Productdeny productdeny;

    @OneToMany(mappedBy = "product", cascade = CascadeType.REMOVE)
    private List<Orderproduct> orderproducts = new ArrayList<>();
}
