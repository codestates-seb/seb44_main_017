package com.main.project.search.document;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.*;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(indexName = "product", createIndex = true)
@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class Eproduct {
    @Id
    private Long product_id;
    private String name;
    private String title;
    private String content;
    private Integer price;
    private String category;
    private String imageLink;
    private Boolean issell;
    private Integer conditionValue;
    private Integer productlike;
    private Integer view;



}
