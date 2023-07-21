package com.main.project.product.repository;

import com.main.project.dto.queryget;
import com.main.project.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query(value = "select product_id,member_id,category,name,title," +
            "content,image_link,modify_at,create_at,price,view,condition_value " +
            "from product where price!=0 and issell=:issell",nativeQuery = true)
    Page<queryget.product> findByIssell(Boolean issell, PageRequest of);

    @Query(value = "select product_id,member_id,category,name,title, " +
            "content,image_link,modify_at,create_at,price,view,condition_value " +
            "from product where price!=0 " +
            "order by create_at ASC",nativeQuery = true)
    Page<queryget.product> findByCreatedAtAsc(Pageable pageable);
    @Query(value = "select product_id,member_id,category,name,title," +
            "content,image_link,modify_at,create_at,price,view,condition_value " +
            "from product where price!=0 " +
            "order by create_at DESC",nativeQuery = true)
    Page<queryget.product> findByCreatedAtDesc(Pageable pageable);

    @Query(value = "select product_id,member_id,category,name,title," +
            "content,image_link,modify_at,create_at,price,view,condition_value " +
            "from product where price!=0 " +
            "order by price ASC",nativeQuery = true)
    Page<queryget.product> findByPriceAsc(Pageable pageable);

    @Query(value = "select product_id,member_id,category,name,title," +
            "content,image_link,modify_at,create_at,price,view,condition_value " +
            "from product where price!=0 " +
            "order by price DESC",nativeQuery = true)
    Page<queryget.product> findByPriceDesc(Pageable pageable);

    @Query(value = "SELECT product_id, member_id, category, name, " +
            "title, content, image_link, modify_at, create_at, price, " +
            "view, condition_value " +
            "FROM product where price!=0" +
            "ORDER BY productlike desc",nativeQuery = true)
    Page<queryget.product> findByLikedMembersDesc(Pageable pageable);

    @Query(value = "select product_id,member_id,category,name,title, " +
            "content,image_link,modify_at,create_at,price,view,condition_value " +
            "from product where issell=:issell and price!=0 " +
            "order by create_at ASC",nativeQuery = true)
    Page<queryget.product> findByCreatedAtAsc(Boolean issell, Pageable pageable);
    @Query(value = "select product_id,member_id,category,name,title, " +
            "content,image_link,modify_at,create_at,price,view,condition_value " +
            "from product where where issell=:issell and price!=0 " +
            " order by create_at DESC",nativeQuery = true)
    Page<queryget.product> findByCreatedAtDesc(Boolean issell,Pageable pageable);
    @Query(value = "select product_id,member_id,category,name,title, " +
            "content,image_link,modify_at,create_at,price,view,condition_value " +
            "from product where issell=:issell and price!=0 " +
            "order by price ASC",nativeQuery = true)
    Page<queryget.product> findByPriceAsc(Boolean issell,Pageable pageable);

    @Query(value = "select product_id,member_id,category,name,title," +
            "content,image_link,modify_at,create_at,price,view,condition_value " +
            "from product where issell=:issell and price!=0 " +
            "order by price DESC",nativeQuery = true)
    Page<queryget.product> findByPriceDesc(Boolean issell,Pageable pageable);
    @Query(value = "SELECT product_id, member_id, category, name, " +
            "title, content, image_link, modify_at, create_at, price, " +
            "view, condition_value " +
            "FROM product where price!=0 and issell=:issell" +
            "ORDER BY productlike desc",nativeQuery = true)
    Page<queryget.product> findByLikedMembersDesc(Boolean issell,Pageable pageable);

}
