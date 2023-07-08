package com.main.project.member.entity;

import com.main.project.notifyView.entity.NotifyView;
import com.main.project.questionBorad.entity.Question;
import com.main.project.questionComment.entity.QComment;
import com.main.project.questionView.entity.QuestionView;
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
    private List<NotifyView> NViews = new ArrayList<>();

    @OneToMany(mappedBy = "users", cascade = CascadeType.REMOVE)
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


    public Member(String email, String name, String password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }


    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

}
