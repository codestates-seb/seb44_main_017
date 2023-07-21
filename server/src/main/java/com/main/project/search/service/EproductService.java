package com.main.project.search.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.main.project.exception.businessLogicException.BusinessLogicException;
import com.main.project.exception.businessLogicException.ExceptionCode;
import com.main.project.search.document.Eproduct;
import lombok.RequiredArgsConstructor;
import org.elasticsearch.action.ActionListener;
import org.elasticsearch.action.delete.DeleteRequest;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import static org.elasticsearch.index.query.QueryBuilders.matchPhraseQuery;
import static org.elasticsearch.index.query.QueryBuilders.matchQuery;

@Service
@RequiredArgsConstructor
public class EproductService {

    private final RestHighLevelClient restHighLevelClient;


    public void addEproduct(Eproduct eproduct)  {

        IndexRequest indexRequest = new IndexRequest("product").id(eproduct.getProductId().toString())
                .source("product", eproduct.getProductId(),
                        "name", eproduct.getName(),
                        "title", eproduct.getTitle(),
                        "content", eproduct.getContent(),
                        "price", eproduct.getPrice(),
                        "category", eproduct.getCategory(),
                        "imageLink", eproduct.getImageLink(),
                        "sell", eproduct.getSell(),
                        "conditionValue", eproduct.getConditionValue(),
                        "productlike", eproduct.getProductlike(),
                        "view", eproduct.getView());

        try {
            IndexResponse indexResponse = restHighLevelClient.index(indexRequest, RequestOptions.DEFAULT);
        } catch (IOException e){
            throw new BusinessLogicException(ExceptionCode.ELASTIC_IOException);
        }


        /*
        return Mono.create(sink -> {
            ActionListener<IndexResponse> actionListener = new ActionListener<IndexResponse>() {
                @Override
                public void onResponse(IndexResponse indexResponse) {
                    sink.success();
                }
                @Override
                public void onFailure(Exception e) {
                }
            };
            restHighLevelClient.indexAsync(indexRequest, RequestOptions.DEFAULT, actionListener);
        });

         */
    }

    public Page<Eproduct> searchProductByName(String title, int page, int size){
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(QueryBuilders.boolQuery().should(QueryBuilders.matchQuery("name.nori_mixed",  title))
                .must(QueryBuilders.matchPhraseQuery("sell","wait")));
        List<Eproduct> productList = getProductList(searchSourceBuilder);
        PageRequest pageRequest = PageRequest.of(page, size);
        int start = (int) pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), productList.size());
        Page<Eproduct> eproductPage = new PageImpl<>(productList.subList(start,end), pageRequest, productList.size());
        return eproductPage;
    }

    private List<Eproduct> getProductList(SearchSourceBuilder searchSourceBuilder) {
        SearchRequest searchRequest = new SearchRequest("product");
        searchRequest.source(searchSourceBuilder);

        List<Eproduct> eproductList = new ArrayList<>();

        try {
            SearchResponse searchResponse = restHighLevelClient.search(searchRequest, RequestOptions.DEFAULT);
            for(SearchHit hit: searchResponse.getHits()){
                ObjectMapper objectMapper = new ObjectMapper();
                try {
                    Eproduct eproduct = objectMapper.readValue(hit.getSourceAsString(), Eproduct.class);
                    eproductList.add(eproduct);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        } catch (IOException e){
            throw new BusinessLogicException(ExceptionCode.ELASTIC_IOException);
        }
        return eproductList;
    }

    /*
    private Flux<Eproduct> getProductFlux(SearchSourceBuilder searchSourceBuilder) {
        SearchRequest searchRequest = new SearchRequest("product");
        searchRequest.source(searchSourceBuilder);

        return Flux.<Eproduct>create(sink -> {
            ActionListener<SearchResponse> actionListener = new ActionListener<SearchResponse>() {
                @Override
                public void onResponse(SearchResponse searchResponse) {

                    for(SearchHit hit : searchResponse.getHits()) {
                        ObjectMapper objectMapper = new ObjectMapper();
                        try {
                            Eproduct eproduct = objectMapper.readValue(hit.getSourceAsString(), Eproduct.class);
                            sink.next(eproduct);
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                    sink.complete();
                }

                @Override
                public void onFailure(Exception e) {
                }
            };

            restHighLevelClient.searchAsync(searchRequest, RequestOptions.DEFAULT, actionListener);
        });
    }

     */
}
