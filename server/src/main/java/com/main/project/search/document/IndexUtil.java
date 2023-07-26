package com.main.project.search.document;

import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;

import java.time.Instant;

public class IndexUtil{
    public static IndexCoordinates createIndexNameWithPostFixWrapper(String indexname){
        return IndexCoordinates.of(indexname + "-" + Instant.now().toEpochMilli());
    }
    public static IndexCoordinates createIndexNameWrapper(String indexName) {
        return IndexCoordinates.of(indexName);
    }
}