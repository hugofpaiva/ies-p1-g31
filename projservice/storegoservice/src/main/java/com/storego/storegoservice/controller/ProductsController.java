package com.storego.storegoservice.controller;


import com.storego.storegoservice.model.*;
import com.storego.storegoservice.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
public class ProductsController {

    @Autowired
    private ProductRepository productRepository;


    @GetMapping("work/products")
    public ResponseEntity<Map<String, Object>> getPurchaseByPersonNif(@RequestParam(required = false) String name,
                                                                      @RequestParam(defaultValue = "0") int page,
                                                                      @RequestParam(defaultValue = "10") int size){
        try {
            List<Product> products = new ArrayList<>();
            Pageable paging = PageRequest.of(page, size);

            Page<Product> pageProd;
            if (name == null)
                pageProd = productRepository.findAll(paging);
            else
                pageProd = productRepository.findByNameContaining(name, paging);

            products = pageProd.getContent();

            Map<String, Object> response = new HashMap<>();
            response.put("products", products);
            response.put("currentPage", pageProd.getNumber());
            response.put("totalItems", pageProd.getTotalElements());
            response.put("totalPages", pageProd.getTotalPages());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
