package com.storego.storegoservice.services;
import com.storego.storegoservice.model.*;
import com.storego.storegoservice.repository.CartProductRepository;
import com.storego.storegoservice.repository.CartRepository;
import com.storego.storegoservice.repository.ProductRepository;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Set;
import java.util.HashSet;

// Connection to DB
import org.springframework.beans.factory.annotation.Autowired;
import com.storego.storegoservice.exception.ResourceNotFoundException;
import com.storego.storegoservice.repository.PersonRepository;

import javax.persistence.EntityNotFoundException;

@Service
public class StoreServices {

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartProductRepository cartProductRepository;

    private Set<Person> clientsInStore;

    public StoreServices() {
        this.clientsInStore = new HashSet<>();
    }

    public Set<Person> getClientsInStore() {
        return clientsInStore;
    }

    public void enterStore(Long nif){
        Person p = personRepository.findByNif(nif);
        p.setLast_visit(new Date());
        personRepository.save(p);
        clientsInStore.add(p);
    }

    public void leaveStore(Long nif){
        Person p = personRepository.findByNif(nif);
        clientsInStore.remove(p);
    }

    public void removeProduct(Long nif, Long prod_id, Integer quantity) {
        CartProduct cp = cartProductRepository.findByCartIdAndProductId(nif, prod_id);
        Integer units = cp.getUnits();
        if (units > quantity){
            cp.setUnits(units-quantity);
            cartProductRepository.save(cp);
        } else {
            cartProductRepository.delete(cp);
        }
        Product p = productRepository.findById(prod_id).orElseThrow(() -> new EntityNotFoundException("Product not found!"));
        Integer stock = p.getStock_current();
        p.setStock_current(stock - quantity);
    }

    //Implement later
    public void addProduct(Long nif, Long prod_id, Integer quantity) {
        CartProduct cp = cartProductRepository.findByCartIdAndProductId(nif, prod_id);
        Integer units = cp.getUnits();
        if (units > quantity){
            cp.setUnits(units-quantity);
            cartProductRepository.save(cp);
        } else {
            cartProductRepository.delete(cp);
        }
        Product p = productRepository.findById(prod_id).orElseThrow(() -> new EntityNotFoundException("Product not found!"));
        Integer stock = p.getStock_current();
        p.setStock_current(stock - quantity);
    }

}
