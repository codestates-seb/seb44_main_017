package com.main.project.search.config;

import com.amazonaws.ClientConfiguration;
import org.apache.http.Header;
import org.apache.http.HttpHost;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.message.BasicHeader;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestClientBuilder;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Base64;

@Configuration
public class ElasticsearchConfig {

    @Value("${elasticsearch.host}")
    
    private String elasticHost;

    @Value("${elasticsearch.user-key}")
    private String elasticKey;

    @Bean
    RestHighLevelClient restHighLevelClient() {
        String auth = "elastic"+":"+elasticKey;
        String basicAuth = "Basic "+ Base64.getEncoder().encodeToString(auth.getBytes());
        RestClientBuilder builder = RestClient.builder(
                new HttpHost(elasticHost, 443, "https"));
        Header[] defaultHeaders = new Header[]{new BasicHeader("Authorization",basicAuth)};
        builder.setDefaultHeaders(defaultHeaders);

        return new RestHighLevelClient(builder);
    }


}