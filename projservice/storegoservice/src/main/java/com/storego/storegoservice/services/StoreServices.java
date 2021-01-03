package com.storego.storegoservice.services;
import com.storego.storegoservice.model.*;
import com.storego.storegoservice.repository.CartProductRepository;
import com.storego.storegoservice.repository.CartRepository;
import com.storego.storegoservice.repository.ProductRepository;
import com.storego.storegoservice.repository.NotificationRepository;
import org.springframework.expression.ExpressionException;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Set;
import java.util.HashSet;

// Connection to DB
import org.springframework.beans.factory.annotation.Autowired;

import com.storego.storegoservice.repository.PersonRepository;


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

    @Autowired
    private NotificationRepository notificationRepository;

    private Set<Person> clientsInStore;
    private int maxClients;

    public StoreServices() {
        this.clientsInStore = new HashSet<>();
        this.maxClients = 5;
    }

    }

    public void enterStore(Long nif){
        // Check if max number of clients has been reached
        if (cartRepository.count() > this.maxClients) {
            System.out.println("MAX NUMBER OF CLIENTS HAS BEEN REACHED!");
            Notification n = new Notification(NotificationType.STORE_FULL);
            System.out.println(n);
            notificationRepository.save(n);
            return;
        }
        Person p = personRepository.findByNif(nif);
        Cart c = new Cart(p);
        cartRepository.save(c);
        p.setLast_visit(new Date());
        personRepository.save(p);
        String format = "Entered the store!";
        // Create cart on database
        if (cartRepository.findByPersonNif(nif) == null) {
            Cart c = new Cart(p);
            cartRepository.save(c);
            p.setCart(c);
            p.setLast_visit(new Date());
            personRepository.save(p);
        } else {
            format = "ERROR! Entered but was already in store!";
        }
        // Add client to in store list
        clientsInStore.add(p);
        // Output fedback
        System.out.println(String.format("%d (%s) " + format, nif, p.getName()));
    }

    public void leaveStore(Long nif){
        Set<CartProduct> products = cartProductRepository.findByCartPersonNif(nif);
        for(CartProduct p: products){
            cartProductRepository.delete(p);
        }
        Cart c = cartRepository.findByPersonNif(nif);
        cartRepository.delete(c);
        Person p = personRepository.findByNif(nif);
        String format = "Left the store!";
        // Delete cart from database
        if (cartRepository.findByPersonNif(nif) != null) {
            Cart c = cartRepository.findByPersonNif(nif);
            System.out.println(c.getId());
            p.setCart(null);
            personRepository.save(p);
            cartRepository.delete(c);
            cartRepository.flush();
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

    public void removeProductFromCart(Long nif, Long prod_id, Integer quantity) throws Exception{
        CartProduct cp = cartProductRepository.findByCartPersonNifAndProductId(nif, prod_id);

        Product product = productRepository.findById(prod_id).orElseThrow(() -> new Exception("Product not found!"));

        if (cp != null) {
            Integer units = cp.getUnits();
            if (units > quantity) {
                cp.setUnits(units - quantity);
                cartProductRepository.save(cp);
            } else {
                cartProductRepository.delete(cp);
            }
            Integer stock = product.getStock_current();
            product.setStock_current(stock - quantity);
        } else {
            throw(new Exception("User hasn't got that product!"));
        }
    }

    public void addProductToCart(Long nif, Long prod_id, Integer quantity) throws Exception{
        CartProduct cp = cartProductRepository.findByCartPersonNifAndProductId(nif, prod_id);
        Product product = productRepository.findById(prod_id).orElseThrow(() -> new Exception("Product not found!"));

        if (cp == null) {
            Cart cart = cartRepository.findByPersonNif(nif);
            if (cart == null) throw(new Exception("Cart of client not found!"));
            cp = new CartProduct(cart, product, quantity);
            cartProductRepository.save(cp);

        } else {
            Integer cp_units = cp.getUnits();
            Integer stock = product.getStock_current();
            if (stock >= cp_units + quantity) {
                cp.setUnits(cp_units + quantity);
                cartProductRepository.save(cp);
                product.setStock_current(stock - quantity);
                productRepository.save(product);
            } else {
                throw(new Exception("Stock is not enough!"));
            }
        }
    }

}
