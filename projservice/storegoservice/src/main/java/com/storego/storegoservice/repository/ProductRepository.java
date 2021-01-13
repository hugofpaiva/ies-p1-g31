package com.storego.storegoservice.repository;


import com.storego.storegoservice.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByNameContaining(String name, Pageable pageable);
    Product findTopByOrderByIdDesc();
}
