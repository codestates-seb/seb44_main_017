package com.main.project.search.repository;

import com.main.project.search.dto.ElasticDto;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;


public interface ElasticRepository extends ElasticsearchRepository<ElasticDto, String> {
    ElasticDto findByName(String name);
}
