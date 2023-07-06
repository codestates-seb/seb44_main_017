package com.main.project.member.entity;

import com.main.project.productComment.ProductComment;
import com.main.project.product.entity.Product;
import com.main.project.question.entity.Question;
import com.main.project.questionComment.entity.Comment;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
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

    @ManyToMany
//            (mappedBy =  "member", cascade = CascadeType.REMOVE)
    @JoinTable(name = "MemberProductLike",
            joinColumns = @JoinColumn(name = "member_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id"))
    private List<Product> likedProducts = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<Comment> questionComments = new ArrayList<>();
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    public void addLikedProducts(Product product){
        if(!this.likedProducts.contains(product))
            this.likedProducts.add(product);
    }

    public void removeLikedProducts(Product product){
        if(this.likedProducts.contains(product))
            this.likedProducts.remove(product);
    }

    public void addProductComments(ProductComment productComment){
        this.productComments.add(productComment);
    }

    public void removeProductComments(ProductComment productComment){
        this.productComments.remove(productComment);
    }

    public boolean hasProductComment(ProductComment productComment) {
        return this.productComments.contains(productComment);
    public boolean getisban() {
        return isban;
    }
}
