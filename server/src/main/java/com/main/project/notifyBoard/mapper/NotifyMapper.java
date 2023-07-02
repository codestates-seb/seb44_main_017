package com.main.project.notifyBoard.mapper;

import com.main.project.notifyBoard.dto.NotifyDto;
import com.main.project.notifyBoard.entity.NotifyBoard;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
@Component
public interface NotifyMapper {
    NotifyBoard notifyDtoPostToNotifyBoard(NotifyDto.Post notifyDtoPost);

    NotifyBoard notifyDtoPatchToNotifyBoard(NotifyDto.Patch notifyDtoPatch);

    NotifyDto.Response notifyBoardToNotifyResponse(NotifyBoard notifyBoard);
}
