package com.main.project.notifyView.entity;

import com.main.project.member.entity.Member;
import com.main.project.notifyBoard.entity.NotifyBoard;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class NotifyView {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long viewsId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member users;

    @OneToOne
    @JoinColumn(name = "board_id")
    private NotifyBoard notifyBoard;


}
