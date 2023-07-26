package com.main.project.search.repository;

import com.main.project.search.document.Eproduct;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface EproductDocumentRepository extends ElasticsearchRepository<Eproduct, String>,BaseElasticSearchRepository<Eproduct> {
    List<Eproduct> findEproductDocumentByName(String name);
}
