package com.main.project.product.entity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.main.project.admin.entity.Admin;
import com.main.project.alarm.entity.Alarm;
import com.main.project.helper.audit.Auditable;
import com.main.project.notifyView.entity.NotifyView;
import com.main.project.order.entity.Orderproduct;
import com.main.project.productComment.ProductComment;
import com.main.project.member.entity.Member;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

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

    @ColumnDefault("0")
    private Integer price;

    private String category;

    @ColumnDefault("0")
    private Integer view;

//    Todo: image deployment
    private String imageLink;

    @ColumnDefault("false")
    private Boolean issell;

    @ColumnDefault("5")
    private Integer conditionValue;

    @ColumnDefault("0")
    private Integer pointValue;

    @ColumnDefault("0")
    private Integer productlike;

    @ManyToMany(mappedBy = "likedProducts")
    private List<Member> likedByMembers = new ArrayList<>();

    @ManyToMany(mappedBy = "viewedProducts")
    private List<Member> viewedMembers = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.REMOVE)
    private List<ProductComment> comments = new ArrayList<>();

    @OneToOne(mappedBy = "product", cascade = CascadeType.REMOVE)
    private Productdeny productdeny;

    @OneToMany(mappedBy = "product", cascade = CascadeType.REMOVE)
    private List<Orderproduct> orderproducts = new ArrayList<>();

    @OneToOne(mappedBy = "product", cascade = CascadeType.REMOVE)
    private ProductLikeCount productLikeCount;

    @OneToMany(mappedBy = "product", cascade = CascadeType.REMOVE)
    private List<Alarm> alarms = new ArrayList<>();

    public void addView(){
        this.setView(this.getView() + 1);
    }

    public void addLikeByMembers(Member member){
        if(!this.likedByMembers.contains(member))
            this.likedByMembers.add(member);
    }

    public void removeLikeByMembers(Member member){
        if(this.likedByMembers.contains(member))
            this.likedByMembers.remove(member);
    }

    public void addViewedMembers(Member member){
        if(!this.viewedMembers.contains(member))
            this.viewedMembers.add(member);
    }

    public void removeViewedMembers(Member member){
        if(this.viewedMembers.contains(member))
            this.viewedMembers.remove(member);
    }

    public int getLikeCount() {
        return likedByMembers.size();
    }

    public boolean isLikedByMember(Long memberId) {
        return likedByMembers.stream()
                .anyMatch(member -> member.getMemberId().equals(memberId));
    }

    public boolean isViewedMembers(Long memberId) {
        return this.viewedMembers.stream()
                .anyMatch(member -> member.getMemberId().equals(memberId));
    }

}
