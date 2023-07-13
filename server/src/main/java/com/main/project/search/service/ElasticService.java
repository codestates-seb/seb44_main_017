package com.main.project.search.service;

import com.main.project.search.dto.ElasticDto;
import com.main.project.search.repository.ElasticRepository;
import com.google.common.collect.Lists;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ElasticService {
    private final ElasticRepository elasticRepository;

    public void save(ElasticDto elasticDto){
        elasticRepository.save(elasticDto);
    }

    public ElasticDto findByName(String name){
        return null;
        //return elasticRepository.findByName(name);
    }

    public List<ElasticDto> findAll() {
        return Lists.newArrayList(elasticRepository.findAll());
    }
}
