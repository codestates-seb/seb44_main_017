package com.main.project.product.service;

import com.main.project.member.entity.RefreshToken;
import com.main.project.product.entity.Product;
import com.main.project.product.entity.Productdeny;
import com.main.project.product.repository.ProductdenyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ProductdenyService {

    private final ProductdenyRepository productdenyRepository;

    @Transactional
    public Productdeny addProductdeny(Productdeny productdeny) {return productdenyRepository.save(productdeny);}

    public boolean findByproductId(Product product){
        return productdenyRepository.existsByProduct(product);
    }

    public Productdeny finddeny(Product product) {
        Optional<Productdeny> optionalProductdeny = productdenyRepository.findByProduct(product);
        Productdeny Pd = optionalProductdeny.get();
        return Pd;
    }

    public void deleteproductdeny(Product product) {
        Productdeny productdeny = finddeny(product);
        productdenyRepository.delete(productdeny);
    }
}
