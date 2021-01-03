package com.storego.storegoservice.repository;

import com.storego.storegoservice.model.TransactionProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionProductRepository extends JpaRepository<TransactionProduct, Long> {
    List<TransactionProduct> findByTransactionId(long id);

}
