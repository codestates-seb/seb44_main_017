package com.main.project.product.entity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.main.project.admin.entity.Admin;
import com.main.project.helper.audit.Auditable;
import com.main.project.notifyView.entity.NotifyView;
import com.main.project.order.entity.Orderproduct;
import com.main.project.product.repository.ProductLikeCountRepository;
import com.main.project.productComment.ProductComment;
import com.main.project.member.entity.Member;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Entity
@Table(name = "Product")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
//@Builder
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

    private Integer view = 0;

//    Todo: image deployment
    private String imageLink;

    private Boolean issell = false;

    private Integer conditionValue = 5;

    private Integer pointValue = 0;

    private Integer productLikeCountVal = 0;

    @ManyToMany(mappedBy = "likedProducts")
    private List<Member> likedByMembers = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.REMOVE)
    private List<ProductComment> comments = new ArrayList<>();

    @OneToOne(mappedBy = "product", cascade = CascadeType.REMOVE)
    private Productdeny productdeny;

    @OneToMany(mappedBy = "product", cascade = CascadeType.REMOVE)
    private List<Orderproduct> orderproducts = new ArrayList<>();

    @OneToOne(mappedBy = "product", cascade = CascadeType.REMOVE)
    private ProductLikeCount productLikeCount;


    public void addView(){
        this.view++;
    }

    public void addLikeByMembers(Member member){
        if(!this.likedByMembers.contains(member))
            this.likedByMembers.add(member);
    }

    public void removeLikeByMembers(Member member){
        if(this.likedByMembers.contains(member))
            this.likedByMembers.remove(member);
    }

    public int getLikeCount() {
        return likedByMembers.size();
    }

    public boolean isLikedByMember(Long memberId) {
        return likedByMembers.stream()
                .anyMatch(member -> member.getMemberId().equals(memberId));
    }
}
