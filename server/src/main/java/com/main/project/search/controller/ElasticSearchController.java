package com.main.project.search.controller;

import com.main.project.dto.MultiResponseDto;
import com.main.project.search.document.Eproduct;
import com.main.project.search.service.EproductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import javax.validation.constraints.Positive;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/search")
@RequiredArgsConstructor
public class ElasticSearchController {
    private final EproductService eproductService;
    @PostMapping
    public ResponseEntity add(@RequestBody Eproduct eproduct) {
        eproductService.addEproduct(eproduct);
        return ResponseEntity.ok(HttpStatus.CREATED);
    }


    @GetMapping
    public ResponseEntity findByName(@RequestParam(name="keyword") String name,
                                      @Positive @RequestParam int page,
                                      @Positive @RequestParam int size){
        Page<Eproduct> eproductPage = eproductService.searchProductByName(name, page-1, size);
        List<Eproduct> eproductList = eproductPage.getContent();
        return ResponseEntity.ok(new MultiResponseDto(eproductList,eproductPage));
    }

}
