package com.storego.storegoservice.controller;

import com.storego.storegoservice.exception.ResourceNotFoundException;
import com.storego.storegoservice.model.*;
import com.storego.storegoservice.repository.CartProductRepository;
import com.storego.storegoservice.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;


import java.util.*;


@RestController
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartProductRepository cartProductRepository;

    @GetMapping("/work/persons_in_store")
    public Set<Person> getPersonsInStore() {
        return cartRepository.findDistinctPerson();
    }

    @GetMapping("/work/num_persons_in_store")
    public Map<String, Integer> getNumPersonsInStore() {
        Map<String, Integer> response = new HashMap<>();
        response.put("persons_in_store",cartRepository.countDistinctPerson());
        return response;
    }


    @GetMapping("/admin/cart/{nif}")
    public ResponseEntity<Map<String, Object>> getCartByPersonNif(@PathVariable(value = "nif") Long personNif) throws ResourceNotFoundException {
        Cart cart = cartRepository.findByPersonNif(personNif);

        if (cart == null){
            throw new ResourceNotFoundException("Person does not have a cart");
        }

        List<CartProduct> cps = cartProductRepository.findByCartId(cart.getId());

        List<Map<String, Object>> result = new ArrayList<>();

        double total = 0;

        for(CartProduct cp: cps){
            Map<String, Object> temp_result = new HashMap<>();
            temp_result.put("products", cp);

            total = total + cp.getProduct().getPrice() * cp.getUnits();

            result.add(temp_result);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("cart", cart);
        response.put("products", result);
        response.put("total", total);

        return new ResponseEntity<>(response, HttpStatus.OK);

    }

}

