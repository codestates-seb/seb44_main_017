package com.main.project.notifyBoard.controller;


import com.main.project.notifyBoard.dto.NotifyDto;
import com.main.project.notifyBoard.mapper.NotifyMapper;
import com.main.project.notifyBoard.service.NotifyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/notify")
@Validated
public class NotifyController {

    private final NotifyService service;


    public NotifyController(NotifyService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity postNotify(@RequestBody @Valid NotifyDto.Post requestBody){
        service.createNotify(requestBody);

        return new ResponseEntity(HttpStatus.CREATED);
    }
}
