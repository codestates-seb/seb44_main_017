package com.main.project.order.entity;

import com.main.project.member.entity.Member;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ColumnDefault("0")
    private Integer moneycount;
    private String postnum;
    private String address;
    private String reciver;
    private String reciverphone;

    @ColumnDefault("0")
    private Integer pointspend;
    private LocalDateTime create_at;
    @ColumnDefault("false")
    private Boolean payed;
    private String tid;
    private Long singleorder;

}


