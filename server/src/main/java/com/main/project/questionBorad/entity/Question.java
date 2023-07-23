package com.main.project.questionBorad.entity;

import com.main.project.helper.audit.Auditable;
import com.main.project.member.entity.Member;
import com.main.project.notifyView.entity.NotifyView;
import com.main.project.questionComment.entity.QComment;
import com.main.project.questionView.entity.QuestionView;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Question extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long questionId;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String content;
    @Column(columnDefinition = "integer default 0")
    private int view;

    public void setView(){
        this.view++;
    }

    @ManyToOne
    @JoinColumn(name = "member_id",nullable = false)
    private Member writer;

    @OneToOne(mappedBy ="question",cascade = CascadeType.REMOVE)
    private QuestionView QViews;

    @OneToMany(mappedBy = "question",cascade = CascadeType.REMOVE)
    private List<QComment> qComments =new ArrayList<>();

    public void setQComments(QComment qComment){
        this.qComments.add(qComment);
        if(qComment.getQuestion()!=this){
            qComment.setQuestion(this);
        }
    }

}
