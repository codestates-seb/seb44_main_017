package com.main.project.comment;

// Todo : Comment entity Implementation

import com.main.project.helper.audit.Auditable;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "Comment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductComment extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productCommentId;

    private String content;

    private Long memberId;

    // Todo : mapping needed
//    @ManyToOne
    @ColumnDefault("0")
    private Long productId;


}
