package com.main.project.questionView.entity;

import com.main.project.member.entity.Member;
import com.main.project.questionBorad.entity.Question;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class QuestionView {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long viewsId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member users;

    @OneToOne
    @JoinColumn(name = "question_id")
    private Question question;

}
