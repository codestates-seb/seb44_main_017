package com.main.project.comment;

// Todo : Comment entity Implementation

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "ProductComment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productCommentId;

    private String content;

    private Long memberId;

    // Todo : mapping needed
//    @ManyToOne
    @ColumnDefault("0")
    private Long productId;

    private LocalDateTime create_at;

    private LocalDateTime modifyAt;

}
