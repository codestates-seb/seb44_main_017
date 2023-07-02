package com.main.project.product.mapper;
// mapper interface implementation

import com.main.project.product.dto.ProductDto;
import com.main.project.product.entity.Product;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    // TODO: Mapping needed
    List<ProductDto.Response> productsToProductResponses(List<Product> products);

    ProductDto.Response productToProductResponse(Product product);

//    Product productPostDtoToProduct(ProductDto.Post productPostDto);
}
