package com.main.project.questionComment.entity;

import com.main.project.admin.entity.Admin;
import com.main.project.helper.audit.Auditable;
import com.main.project.member.entity.Member;
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
public class QComment extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentId;

    @Column(nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name = "admin_id",nullable = false)
    private Admin admin;

    @ManyToOne
    @JoinColumn(name = "question_id",nullable = false)
    private Question question;
}
