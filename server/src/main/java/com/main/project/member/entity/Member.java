package com.main.project.member.entity;

import com.main.project.notifyView.entity.NotifyView;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
@Entity
@Table(name = "Member")
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

    @OneToMany(mappedBy = "users", cascade = CascadeType.REMOVE)
    private List<NotifyView> views = new ArrayList<>();

    public void setViews(NotifyView views){
        this.views.add(views);
    }


    public Member(String email, String name, String password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }


    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();


}