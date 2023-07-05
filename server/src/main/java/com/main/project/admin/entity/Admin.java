package com.main.project.admin.entity;

import com.main.project.notifyBoard.entity.NotifyBoard;
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

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @OneToMany(mappedBy = "admin",cascade = CascadeType.REMOVE)
    private List<NotifyBoard> notifies = new ArrayList<>();

    public void setNotifies(NotifyBoard notifyBoard){
        this.notifies.add(notifyBoard);
        if(notifyBoard.getAdmin() != this) notifyBoard.setAdmin(this);
    }
}
