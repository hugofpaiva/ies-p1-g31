package com.storego.storegoservice.repository;

import com.storego.storegoservice.model.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {

}
