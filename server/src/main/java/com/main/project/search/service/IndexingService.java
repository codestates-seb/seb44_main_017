package com.main.project.search.service;

import com.main.project.product.entity.Product;
import com.main.project.product.mapper.ProductMapper;
import com.main.project.product.repository.ProductRepository;
import com.main.project.search.controller.ElasticSearchController;
import com.main.project.search.document.Eproduct;
import com.main.project.search.document.IndexUtil;
import com.main.project.search.repository.EproductDocumentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@EnableScheduling
@Slf4j
public class IndexingService {
    private final ProductRepository productRepository;
    private final EproductDocumentRepository eproductDocumentRepository;
    private final ProductMapper productMapper;

    private static final String INDEX_PREFIX_NAME ="product";
    private static final String ALIAS_NAME = "product";

    //@Scheduled(cron = "0/10 * * * * *")
    public void indexingProduct() {
        log.info("indexing ...");
        IndexCoordinates indexNameWrapper = IndexUtil.createIndexNameWithPostFixWrapper(INDEX_PREFIX_NAME);
        IndexCoordinates aliasNameWrapper = IndexUtil.createIndexNameWrapper(ALIAS_NAME);

        Set<String> existIndexNames = eproductDocumentRepository.findIndexNamesByAlias(aliasNameWrapper);
        List<Product> productList = productRepository.findAll();
        List<Eproduct> eproductlist = productList.stream()
                .map(user -> productMapper.productToEproduct(user))
                .collect(Collectors.toList());


        eproductDocumentRepository.saveAll(eproductlist, indexNameWrapper);

        existIndexNames.forEach(indexName -> eproductDocumentRepository.deleteIndex(IndexUtil.createIndexNameWrapper(indexName)));
        eproductDocumentRepository.setAlias(indexNameWrapper, aliasNameWrapper);

    }
}
