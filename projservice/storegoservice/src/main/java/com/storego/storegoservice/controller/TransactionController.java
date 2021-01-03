package com.storego.storegoservice.controller;

import com.storego.storegoservice.exception.ResourceNotFoundException;
import com.storego.storegoservice.model.Person;
import com.storego.storegoservice.model.Product;
import com.storego.storegoservice.model.Transaction;
import com.storego.storegoservice.model.TransactionProduct;
import com.storego.storegoservice.repository.*;
import com.storego.storegoservice.services.StoreServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@EnableJpaRepositories(basePackageClasses = {TransactionRepository.class})
@RestController
public class TransactionController {
    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private TransactionProductRepository transactionProductRepository;

    @Autowired
    private CartRepository cartRepository;


    @GetMapping("/admin/monthly_profit")
    public double getMonthlyProfit() {
        double total = 0;
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.MONTH, -1);
        Date result = cal.getTime();
        List<Transaction> transactions = transactionRepository.findByDateIsGreaterThanEqual(result);
        for (Transaction t: transactions){
            List<TransactionProduct> products = transactionProductRepository.findByTransactionId(t.getId());
            for (TransactionProduct p: products){
               total = total + p.getProduct().getPrice() * p.getUnits();
            }

        }

        return total;
    }



}
