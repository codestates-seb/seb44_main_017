package com.main.project.admin.entity;

import com.main.project.notifyBoard.entity.NotifyBoard;
import com.main.project.product.entity.Product;
import com.main.project.notifyBoard.entity.NotifyBoard;
import com.main.project.questionComment.entity.QComment;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
@Entity
@Table(name = "Admin")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long adminId;
    private String email;
    private String password;
    private String name;
    private String phone;

    public Admin(String email, String name, String password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }

    @ElementCollection(fetch = FetchType.LAZY)
    private List<String> roles = new ArrayList<>();

    @OneToMany(mappedBy = "writer",cascade = CascadeType.REMOVE)
    private List<NotifyBoard> notifies = new ArrayList<>();

    @OneToMany(mappedBy = "writer",cascade = CascadeType.REMOVE)
    private List<QComment> qComments = new ArrayList<>();

    public void setNotifies(NotifyBoard notifyBoard){
        this.notifies.add(notifyBoard);
        if(notifyBoard.getWriter() != this) notifyBoard.setWriter(this);
    }

    public void setQComments(QComment qComment){
        this.qComments.add(qComment);
        if (qComment.getWriter() != this) qComment.setWriter(this);
    }

    @OneToMany(mappedBy = "admin", cascade = CascadeType.REMOVE)
    private List<Product> products = new ArrayList<>();
    
}
