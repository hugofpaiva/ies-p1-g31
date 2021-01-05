package com.storego.storegoservice.controller;

import com.storego.storegoservice.model.Transaction;
import com.storego.storegoservice.model.TransactionProduct;
import com.storego.storegoservice.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import java.util.*;

@RestController
public class TransactionController {
    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private TransactionProductRepository transactionProductRepository;


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

    @GetMapping("/work/last_bought_products")
    public  List <Map<String, Date>> getLast10BoughtProducts() {
        List <Map<String, Date>> result = new ArrayList <>();

        List<TransactionProduct> products = transactionProductRepository.findTop10ByOrderByTransaction_DateDesc();

        for (TransactionProduct p: products){
            Map<String, Date> temp_map = new HashMap<>();
            temp_map.put(p.getProduct().getName(), p.getTransaction().getDate());
            result.add(temp_map);
        }

        return result;
    }


    @GetMapping("/admin/purchases/{nif}")
    public ResponseEntity<Map<String, Object>> getPurchaseByPersonNif(@PathVariable(value = "nif") Long personNif,
                                                             @RequestParam(defaultValue = "0") int page,
                                                             @RequestParam(defaultValue = "10") int size){
        try {
            List<Transaction> transactions = new ArrayList<>();
            Pageable paging = PageRequest.of(page, size);

            Page<Transaction> pageTrans;

            pageTrans = transactionRepository.findByClient_NifOrderByDateDesc(personNif, paging);

            transactions = pageTrans.getContent();

            List<Map<String, Object>> result = new ArrayList<>();

            for(Transaction t: transactions){
                Map<String, Object> temp_result = new HashMap<>();
                temp_result.put("transaction", t);
                List<TransactionProduct> products = transactionProductRepository.findByTransactionId(t.getId());
                temp_result.put("products", products);
                temp_result.put("nproducts", transactionProductRepository.countByTransactionId(t.getId()));
                double total = 0;
                for(TransactionProduct p: products){
                    total = total + p.getProduct().getPrice() * p.getUnits();
                }
                temp_result.put("total", total);
                result.add(temp_result);
            }

            Map<String, Object> response = new HashMap<>();
            response.put("transactions", result);
            response.put("currentPage", pageTrans.getNumber());
            response.put("totalItems", pageTrans.getTotalElements());
            response.put("totalPages", pageTrans.getTotalPages());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/admin/purchases/")
    public ResponseEntity<Map<String, Object>> getPurchases(
                                                                      @RequestParam(defaultValue = "0") int page,
                                                                      @RequestParam(defaultValue = "10") int size){
        try {
            List<Transaction> transactions = new ArrayList<>();
            Pageable paging = PageRequest.of(page, size);

            Page<Transaction> pageTrans;

            pageTrans = transactionRepository.findAllByOrderByDateDesc(paging);

            transactions = pageTrans.getContent();

            List<Map<String, Object>> result = new ArrayList<>();

            for(Transaction t: transactions){
                Map<String, Object> temp_result = new HashMap<>();
                temp_result.put("transaction", t);
                List<TransactionProduct> products = transactionProductRepository.findByTransactionId(t.getId());
                temp_result.put("products", products);
                temp_result.put("nproducts", transactionProductRepository.countByTransactionId(t.getId()));
                double total = 0;
                for(TransactionProduct p: products){
                    total = total + p.getProduct().getPrice() * p.getUnits();
                }
                temp_result.put("total", total);
                result.add(temp_result);
            }

            Map<String, Object> response = new HashMap<>();
            response.put("transactions", result);
            response.put("currentPage", pageTrans.getNumber());
            response.put("totalItems", pageTrans.getTotalElements());
            response.put("totalPages", pageTrans.getTotalPages());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
