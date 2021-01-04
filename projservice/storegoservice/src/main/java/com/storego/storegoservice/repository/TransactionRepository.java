package com.storego.storegoservice.repository;

import com.storego.storegoservice.model.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByDateIsGreaterThanEqual(Date date);
    Page<Transaction> findByClient_NifOrderByDateDesc(Long nif, Pageable pageable);
    Page<Transaction> findAllByOrderByDateDesc(Pageable pageable);


}
