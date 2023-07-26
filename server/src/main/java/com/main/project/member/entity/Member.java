package com.main.project.member.entity;

import com.main.project.alarm.entity.Alarm;
import com.main.project.productComment.ProductComment;
import com.main.project.notifyView.entity.NotifyView;
import com.main.project.questionBorad.entity.Question;
import com.main.project.questionComment.entity.QComment;
import com.main.project.questionView.entity.QuestionView;
import com.main.project.order.entity.Order;
import com.main.project.order.entity.Orderproduct;
import com.main.project.product.entity.Product;
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
        this.money = 0;
        this.isban = false;
    }


    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<Product> products = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<Alarm> alarms = new ArrayList<>();

    @OneToMany(mappedBy = "writer", cascade = CascadeType.REMOVE)
    private List<ProductComment> productComments = new ArrayList<>();

    @ManyToMany
//            (mappedBy =  "member", cascade = CascadeType.REMOVE)
    @JoinTable(name = "MemberProductLike",
            joinColumns = @JoinColumn(name = "member_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id"))
    private List<Product> likedProducts = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "MemberProductView",
            joinColumns = @JoinColumn(name = "member_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id"))
    private List<Product> viewedProducts = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<Orderproduct> orderproducts = new ArrayList<>();

    @OneToOne(mappedBy = "member", cascade = CascadeType.REMOVE)
    private Order order;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @OneToMany(mappedBy = "users")
    private List<NotifyView> NViews = new ArrayList<>();

    @OneToMany(mappedBy = "users")
    private List<QuestionView> QViews = new ArrayList<>();

    @OneToMany(mappedBy = "writer",cascade = CascadeType.REMOVE)
    private List<Question> questions = new ArrayList<>();


    public void setNViews(NotifyView view){
        this.NViews.add(view);
    }

    public void setQViews(QuestionView view){
        this.QViews.add(view);
    }

    public void setQuestions(Question question){
        this.questions.add(question);
        if(question.getWriter() != this){
            question.setWriter(this);
        }
    }

    public void addLikedProducts(Product product){
        if(!this.likedProducts.contains(product))
            this.likedProducts.add(product);
    }

    public void removeLikedProducts(Product product){
        if(this.likedProducts.contains(product))
            this.likedProducts.remove(product);
    }

    public void addViewedProducts(Product product){
        if(!this.viewedProducts.contains(product))
            this.viewedProducts.add(product);
    }

    public void removeViewedProducts(Product product){
        if(this.viewedProducts.contains(product))
            this.viewedProducts.remove(product);
    }

    public void addProductComments(ProductComment productComment){
        this.productComments.add(productComment);
    }

    public void removeProductComments(ProductComment productComment){
        this.productComments.remove(productComment);
    }

    public boolean hasProductComment(ProductComment productComment) {
        return this.productComments.contains(productComment);
    }
    public boolean getisban() {
        return isban;
    }
}
