package com.main.project.search.controller;

import com.main.project.dto.SingleResponseDto;
import com.main.project.member.dto.MemberDto;
import com.main.project.member.entity.Member;
import com.main.project.search.dto.ElasticDto;
import com.main.project.search.repository.ElasticRepository;
import com.main.project.search.service.ElasticService;
import com.main.project.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/search")
@Slf4j
@RequiredArgsConstructor
public class ElasticController {
    private final ElasticService elasticService;
    @PostMapping
    public ResponseEntity postElastic(@Valid @RequestBody ElasticDto requestBody) {

        elasticService.save(requestBody);
        return ResponseEntity.ok(requestBody);
    }

    @GetMapping
    public ResponseEntity getElastic(){
        List<ElasticDto> elasticlist = elasticService.findAll();

        return ResponseEntity.ok(new SingleResponseDto<>(elasticlist));
    }
}
