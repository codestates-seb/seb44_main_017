package com.main.project.product.entity;
import com.main.project.comment.ProductComment;
import com.main.project.helper.audit.Auditable;
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

    private Long adminId;

    private Long memberId;

    private Integer condition_value = 5;

    @OneToMany
    private List<ProductComment> comments = new ArrayList<>();
}
