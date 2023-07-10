package com.main.project.questionBorad.dto;


import com.main.project.notifyBoard.dto.NotifiesResponseDto;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
public class QuestionsResponseDto {
    private List<QuestionDto.Response> data;

    private PageInfo pageInfo;

    public QuestionsResponseDto(List<QuestionDto.Response> data, Page page){
        this.data=data;
        this.pageInfo = QuestionsResponseDto.PageInfo.builder()
                .page(page.getNumber() + 1)
                .size(page.getSize())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .build();
    }


    @Getter
    @Builder
    public static class PageInfo {
        private int page;
        private int size;
        private long totalElements;
        private int totalPages;
    }
}
