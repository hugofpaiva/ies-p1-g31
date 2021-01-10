package com.storego.storegoservice.controller;


import com.storego.storegoservice.exception.ResourceNotFoundException;
import com.storego.storegoservice.model.*;
import com.storego.storegoservice.repository.ProductCategoryRepository;
import com.storego.storegoservice.repository.ProductRepository;
import com.storego.storegoservice.services.UpdateScriptGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

@RestController
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    @Autowired
    private UpdateScriptGeneratorService updateScriptGeneratorService;

    @GetMapping("/work/products")
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

    @GetMapping("/work/productscategories")
    public List<ProductCategory> getCategories() {
        return productCategoryRepository.findAll();
    }

    //Use for edit and restock, it is possible to only send the information needed to update
    @PutMapping("/admin/product/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable(value = "id") long productId,
                                               @Valid @RequestBody Product productDetails) throws ResourceNotFoundException {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found for this id: " + productId));

        if (productDetails.getPrice() != null) {
            product.setPrice(productDetails.getPrice());
        }
        if (productDetails.getStock_minimum() != null) {
            product.setStock_minimum(productDetails.getStock_minimum());
        }

        //Used to send how many more products it is to add
        if (productDetails.getStock_current() != null) {
            product.setStock_current(product.getStock_current() + productDetails.getStock_current());
            updateScriptGeneratorService.restockProduct(productDetails.getStock_current(), product);
        }
        if (productDetails.getCategory() != null) {
            ProductCategory cat = productCategoryRepository.findById(productDetails.getCategory().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product Category not found for this id: " + productDetails.getCategory().getId()));
            product.setCategory(cat);
        }
        if (productDetails.getDescription() != null) {
            product.setDescription(productDetails.getDescription());
        }
        if (productDetails.getName() != null) {
            product.setName(productDetails.getName());
        }

        Product updatedProd = productRepository.save(product);
        return ResponseEntity.ok(updatedProd);
    }

    @PostMapping("/admin/products")
    public Product createProduct(@Valid @RequestBody Product product) {
        Product p = productRepository.save(product);
        updateScriptGeneratorService.addProduct(product);
        return p;
    }

    @DeleteMapping("/admin/product/{id}")
    public Map<String, Boolean> deleteProduct(@PathVariable(value = "id") Long productId)
            throws ResourceNotFoundException {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found for this id: " + productId));

        productRepository.delete(product);
        updateScriptGeneratorService.deleteProduct(product);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

}
