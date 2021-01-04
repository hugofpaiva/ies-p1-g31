package com.storego.storegoservice.repository;

import com.storego.storegoservice.model.Transaction;
import com.storego.storegoservice.model.TransactionProduct;
import com.storego.storegoservice.model.TransactionProductKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface TransactionProductRepository extends JpaRepository<TransactionProduct, TransactionProductKey> {
    public TransactionProduct findByTransactionClientNifAndProductId(long nif, long product_id);
    public Set<TransactionProduct> findByTransactionClientNif(long nif);
}
