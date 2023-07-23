package com.main.project.notifyBoard.entity;

import com.main.project.admin.entity.Admin;
import com.main.project.helper.audit.Auditable;
import com.main.project.product.entity.Product;
import com.main.project.notifyView.entity.NotifyView;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class NotifyBoard extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long boardId;
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
    @JoinColumn(name = "admin_id",nullable = false)
    private Admin writer;

    @OneToOne(mappedBy ="board",cascade = CascadeType.REMOVE)
    private NotifyView NViews;
}
