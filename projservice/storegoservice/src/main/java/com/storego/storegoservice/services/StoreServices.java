package com.storego.storegoservice.services;
import com.storego.storegoservice.model.*;
import com.storego.storegoservice.repository.CartProductRepository;
import com.storego.storegoservice.repository.CartRepository;
import com.storego.storegoservice.repository.ProductRepository;
import org.springframework.expression.ExpressionException;
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
import javax.transaction.Transactional;

@Service
public class StoreServices {

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartProductRepository cartProductRepository;

    @Autowired
    private CartRepository cartRepository;

    private Set<Person> clientsInStore;


    public StoreServices() {
        this.clientsInStore = new HashSet<>();
    }

    public Set<Person> getClientsInStore() {
        return clientsInStore;
    }

    public void enterStore(Long nif){
        Person p = personRepository.findByNif(nif);
        Cart c = new Cart(p);
        cartRepository.save(c);
        p.setCart(c);
        p.setLast_visit(new Date());
        personRepository.save(p);
        clientsInStore.add(p);
    }

    public void leaveStore(Long nif){
        Person p = personRepository.findByNif(nif);
        Cart c = cartRepository.findByPersonNif(nif);
            cartRepository.deleteById(c.getId());
            if (cartRepository.findByPersonNif(nif) != null) {
                System.out.println("ERRRRRROOOOOORRR! Removed but still on database!");
    }
        } else {
            format = "ERROR! Left but was not in store!";
            }
        // Remove client from in store list
        clientsInStore.remove(p);
        // Output feedback
        System.out.println(String.format("%d (%s) " + format, nif, p.getName()));
            }

}
