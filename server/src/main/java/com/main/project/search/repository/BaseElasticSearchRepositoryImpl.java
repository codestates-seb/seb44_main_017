package com.main.project.search.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.IndexOperations;
import org.springframework.data.elasticsearch.core.index.AliasAction;
import org.springframework.data.elasticsearch.core.index.AliasActionParameters;
import org.springframework.data.elasticsearch.core.index.AliasActions;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
@RequiredArgsConstructor
public class BaseElasticSearchRepositoryImpl<T> implements BaseElasticSearchRepository<T> {
    private final ElasticsearchOperations operations;

    @Override
    public <S extends T> S save(S entity, IndexCoordinates indexName) {
        return operations.save(entity, indexName);
    }

    @Override
    public <S extends T> Iterable<S> saveAll(Iterable<S> entities, IndexCoordinates indexName) {
        return operations.save(entities, indexName);
    }

    @Override
    public boolean setAlias(IndexCoordinates indexNameWrapper, IndexCoordinates aliasNameWrapper) {
        IndexOperations indexOperations = operations.indexOps(indexNameWrapper);
        AliasActions aliasActions = new AliasActions();
        aliasActions.add(new AliasAction.Add(AliasActionParameters.builder()
                .withIndices(indexOperations.getIndexCoordinates().getIndexNames())
                .withAliases(aliasNameWrapper.getIndexName())
                .build()));

        return indexOperations.alias(aliasActions);
    }

    @Override
    public Set<String> findIndexNamesByAlias(IndexCoordinates aliasNameWrapper) {
        IndexOperations indexOperations = operations.indexOps(aliasNameWrapper);
        return indexOperations.getAliasesForIndex(aliasNameWrapper.getIndexName()).keySet();
    }

    @Override
    public boolean deleteIndex(IndexCoordinates indexNameWrapper) {
        IndexOperations indexOperations = operations.indexOps(indexNameWrapper);
        return indexOperations.delete();
    }
}
