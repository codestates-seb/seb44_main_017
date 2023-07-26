package com.main.project.product.service;

import com.main.project.exception.businessLogicException.BusinessLogicException;
import com.main.project.exception.businessLogicException.ExceptionCode;
import com.main.project.product.entity.Product;
import com.main.project.product.entity.ProductLikeCount;
import com.main.project.product.repository.ProductLikeCountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
public class ProductLikeCountService {
    private final ProductLikeCountRepository productLikeCountRepository;

    public ProductLikeCountService(ProductLikeCountRepository productLikeCountRepository) {
        this.productLikeCountRepository = productLikeCountRepository;
    }

    public boolean findByproductId(Product product){
        return productLikeCountRepository.existsByProduct(product);
    }

    public Optional<ProductLikeCount> findProductLikeCount(Product product){
        return  productLikeCountRepository.findByProductProductId(product.getProductId());
    }

    public ProductLikeCount findVerifiedProductLikeCount(Product product){
        ProductLikeCount productLikeCount =
                findProductLikeCount(product)
                        .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PRODUCTLIKE_NOT_FOUND));
        return  productLikeCount;
    }

    public void deleteProductLikeCount(Product product){
        ProductLikeCount productLikeCount = findVerifiedProductLikeCount(product);
        productLikeCountRepository.delete(productLikeCount);
    }

    @Transactional
    public void updateProductLikeCount(Product product, int i) {
        ProductLikeCount findProductLikeCount = findVerifiedProductLikeCount(product);
        findProductLikeCount.setLikeCount(findProductLikeCount.getLikeCount() + i);
        findProductLikeCount.setProduct(product);
        productLikeCountRepository.save(findProductLikeCount);
    }

    public void createProductLikeCount(Product product) {
        ProductLikeCount productLikeCount = new ProductLikeCount();
        productLikeCount.setProduct(product);
        productLikeCount.setLikeCount(0);
        productLikeCountRepository.save(productLikeCount);
    }
}
