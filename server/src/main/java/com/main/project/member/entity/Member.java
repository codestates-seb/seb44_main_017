package com.main.project.member.entity;

import com.main.project.comment.ProductComment;
import com.main.project.order.entity.Order;
import com.main.project.order.entity.Orderproduct;
import com.main.project.product.entity.Product;
import com.main.project.product.entity.Productdeny;
import com.main.project.question.entity.Question;
import com.main.project.questionComment.entity.Comment;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;
    private String email;
    private String password;
    private String name;
    private String phone;
    private String profile;
    @ColumnDefault("0")
    private int money;
    @ColumnDefault("false")
    private boolean isban;

    public Member(String email, String name, String password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<Product> products = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<Question> questions = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<ProductComment> productComments = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<Comment> questionComments = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<Productdeny> productdenies = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<Orderproduct> orderproducts = new ArrayList<>();

    @OneToOne(mappedBy = "member", cascade = CascadeType.REMOVE)
    private Order order;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();



    public boolean getisban() {
        return isban;
    }
}
