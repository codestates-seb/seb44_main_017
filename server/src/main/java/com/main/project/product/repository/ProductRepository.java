package com.main.project.product.repository;

import com.main.project.dto.queryget;
import com.main.project.product.dto.ProductDto;
import com.main.project.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query(value = "select product_id,member_id,category,name,title," +
            "content,image_link,modify_at,create_at,price,view,condition_value " +
            "from product where issell=:issell",nativeQuery = true)
    Page<queryget.product> findByIssell(Boolean issell, PageRequest of);

    @Query(value = "select product_id,member_id,category,name,title," +
            "content,image_link,modify_at,create_at,price,view,condition_value " +
            "from product order by create_at ASC",nativeQuery = true)
    Page<queryget.product> findByCreatedAtAsc(Pageable pageable);
    @Query(value = "select product_id,member_id,category,name,title," +
            "content,image_link,modify_at,create_at,price,view,condition_value " +
            "from product order by create_at DESC",nativeQuery = true)
    Page<queryget.product> findByCreatedAtDesc(Pageable pageable);

    @Query(value = "select product_id,member_id,category,name,title," +
            "content,image_link,modify_at,create_at,price,view,condition_value " +
            "from product order by price ASC",nativeQuery = true)
    Page<queryget.product> findByPriceAsc(Pageable pageable);

    @Query(value = "select product_id,member_id,category,name,title," +
            "content,image_link,modify_at,create_at,price,view,condition_value " +
            "from product order by price DESC",nativeQuery = true)
    Page<queryget.product> findByPriceDesc(Pageable pageable);

    @Query(value = "select p.product_id,p.member_id,p.category,p.name,p.title,p.content," +
            "p.image_link,p.modify_at,p.create_at,p.price,p.productlike,p.view,p.condition_value"+
            "from product p" +
            "left outer join member_product_like mpl" +
            "on p.product_id = mpl.product_id" +
            "order by count(mpl.member_id) DESC",nativeQuery = true)
    Page<queryget.product> findByLikedMembersDesc(Pageable pageable);

    @Query(value = "select product_id,member_id,category,name,title," +
            "content,image_link,modify_at,create_at,price,view,condition_value " +
            "from product where issell=:issell order by create_at ASC",nativeQuery = true)
    Page<queryget.product> findByCreatedAtAsc(Boolean issell, Pageable pageable);
    @Query(value = "select product_id,member_id,category,name,title," +
            "content,image_link,modify_at,create_at,price,view,condition_value " +
            "from product where issell=:issell order by create_at DESC",nativeQuery = true)
    Page<queryget.product> findByCreatedAtDesc(Boolean issell,Pageable pageable);
    @Query(value = "select product_id,member_id,category,name,title," +
            "content,image_link,modify_at,create_at,price,view,condition_value " +
            "from product where issell=:issell order by price ASC",nativeQuery = true)
    Page<queryget.product> findByPriceAsc(Boolean issell,Pageable pageable);

    @Query(value = "select product_id,member_id,category,name,title," +
            "content,image_link,modify_at,create_at,price,view,condition_value " +
            "from product where issell=:issell order by price DESC",nativeQuery = true)
    Page<queryget.product> findByPriceDesc(Boolean issell,Pageable pageable);
    @Query(value = "select p.product_id,p.member_id,p.category,p.name,p.title,p.content," +
            "p.image_link,p.modify_at,p.create_at,p.price,p.productlike,p.view,p.condition_value"+
            "from product p" +
            "where p.issell=:issell" +
            "left outer join member_product_like mpl" +
            "on p.product_id = mpl.product_id" +
            "order by count(mpl.member_id) DESC",nativeQuery = true)
    Page<queryget.product> findByLikedMembersDesc(Boolean issell,Pageable pageable);
}
