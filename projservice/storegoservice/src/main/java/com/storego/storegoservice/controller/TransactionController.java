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
    public Map<String, Double> getMonthlyProfit() {
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

        Map<String, Double> response = new HashMap<>();
        response.put("last_month_total",total);
        return response;
    }

    @GetMapping("/admin/monthly_sale_by_category")
    public Map<String, Integer> getSalesByProductCategory() {
        Map<String, Integer> categories = new HashMap<>();
        double total = 0;
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.MONTH, -1);
        Date result = cal.getTime();
        List<Transaction> transactions = transactionRepository.findByDateIsGreaterThanEqual(result);
        for (Transaction t: transactions){
            List<TransactionProduct> products = transactionProductRepository.findByTransactionId(t.getId());
            for (TransactionProduct p: products){
                total = total + p.getUnits();
                String category_name = p.getProduct().getCategory().getName();
                Integer value = categories.get(category_name);
                if (value != null) {
                    categories.put(category_name, value + p.getUnits());
                } else {
                    categories.put(category_name, p.getUnits());
                }

            }

        }

        for (String cat: categories.keySet()){
            Integer value = categories.get(cat);
            categories.put(cat, (int) Math.round(value * 100 /total));
        }

        return categories;
    }

    @GetMapping("/admin/last_bought_products")
    public  List <Map<String, Date>> getLastBoughtProducts() {
        List <Map<String, Date>> result = new List <Map<String, Date>>;

        List<TransactionProduct> products = transactionProductRepository.findTop10ByTransaction_DateOrderByTransaction_DateDesc();

        for (TransactionProduct p: products){
            Map<String, Date> temp_map = new HashMap<>();
            temp_map.put(p.getProduct().getName(), p.getTransaction().getDate());
            result.add(temp_map);
        }

        return result;
    }



}
