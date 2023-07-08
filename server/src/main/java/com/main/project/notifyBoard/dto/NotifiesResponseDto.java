package com.main.project.notifyBoard.dto;

import com.main.project.admin.dto.AdminDto;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class NotifiesResponseDto {
    private List<NotifyDto.Response> data; // 따로 response dto
    private PageInfo pageInfo;


    public NotifiesResponseDto(List<NotifyDto.Response> data, Page page) {
        this.data = data;
        this.pageInfo = PageInfo.builder()
                .page(page.getNumber() + 1)
                .size(page.getSize())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .build();
    }
    @Getter
    @Builder
    public static class MultiNotifiesResponse {
        private long boardId;
        private String title;
        private String content;
        private LocalDateTime createAt;
        private LocalDateTime modifyAt;
        private int view;
        private AdminDto.NotifyResponse admin;
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
