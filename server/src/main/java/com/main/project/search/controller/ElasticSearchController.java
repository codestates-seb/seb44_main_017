package com.main.project.search.controller;

import com.main.project.dto.MultiResponseDto;
import com.main.project.search.document.Eproduct;
import com.main.project.search.service.EproductService;
import com.main.project.search.service.IndexingService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/search")
@RequiredArgsConstructor
public class ElasticSearchController {
    private final EproductService eproductService;
    private final IndexingService indexingService;


    @GetMapping
    public ResponseEntity findByName(@RequestParam(name="keyword") String name,
                                      @Positive @RequestParam int page,
                                      @Positive @RequestParam int size){
        Page<Eproduct> eproductPage = eproductService.searchProductByName(name, page-1, size);
        List<Eproduct> eproductList = eproductPage.getContent();
        return ResponseEntity.ok(new MultiResponseDto(eproductList,eproductPage));
    }

    @PostMapping(value = "/create_content_index")
    public ResponseEntity create_product_index(){
            indexingService.indexingProduct();
        return new ResponseEntity(HttpStatus.OK);
    }

}
