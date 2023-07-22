package com.main.project.ProductTest;


import com.google.gson.Gson;
import com.main.project.member.entity.RefreshToken;
import com.main.project.product.controller.dto.ProductDto;
import com.main.project.product.entity.Product;
import com.main.project.product.mapper.ProductMapper;
import com.main.project.product.service.ProductService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.nio.charset.StandardCharsets;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

//@SpringBootTest
//@AutoConfigureMockMvc
public class ProductControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private ProductService productService;

    @Autowired
    private ProductMapper mapper;

    private static String path = "/products";

//    @Test
    public void postProductTest() throws Exception{
        // given
        Long memberId = 1L;
        ProductDto.Post postDto = new ProductDto.Post(
                "Shirts", "secondhand Shirts", "cool hawaiian shirt", memberId
                , "top", "example.com", 9, "700", "70,000");

        Product product = mapper.productPostDtoToProduct(postDto);
        product.setProductId(1L);

        given(productService
                .createProduct(Mockito.any(Product.class), Mockito.anyLong()))
                ;

        String content = gson.toJson(postDto);

        // when
        String mockRT = "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJtZW1iZXIiLCJzdWIiOiJ1c2VyMEBnbWFpbC5jb20iLCJpYXQiOjE2ODk5MjYwMjYsImV4cCI6MTY4OTk1MTIyNn0.DlZ2H-ZhBloHSsBXrIbz_HzlKHrWs1dtXuqoWF4rDX4";

        ResultActions actions = mockMvc
                .perform(
                        post(path)
                                .header("Refresh", mockRT)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                                .accept(MediaType.APPLICATION_JSON)
                );

        // then

//        actions.andExpect(status().isCreated());
    }

//    @Test
    public void getProductTest(){

    }
}
