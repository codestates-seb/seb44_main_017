package com.main.project.search.document;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

@NoArgsConstructor
@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class Eproduct {
    @Id
    private Long productId;
    private String name;
    private String title;
    private String content;
    private Integer price;
    private String category;
    private String imageLink;
    private String sell;
    private Integer conditionValue;
    private Integer productlike;
    private Integer view;

}
