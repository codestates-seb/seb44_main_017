package com.main.project.notifyBoard.service;


import com.main.project.notifyBoard.dto.NotifyDto;
import com.main.project.notifyBoard.entity.NotifyBoard;
import com.main.project.notifyBoard.mapper.NotifyMapper;
import com.main.project.notifyBoard.repository.NotifyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class NotifyService {

    private final NotifyRepository notifyRepository;
    private final NotifyMapper mapper;

    public NotifyService(NotifyRepository notifyRepository, NotifyMapper mapper) {
        this.notifyRepository = notifyRepository;
        this.mapper = mapper;
    }

    public void createNotify(NotifyDto.Post requestBody){
        NotifyBoard board = mapper.notifyDtoPostToNotifyBoard(requestBody);
        notifyRepository.save(board);
    }
}
