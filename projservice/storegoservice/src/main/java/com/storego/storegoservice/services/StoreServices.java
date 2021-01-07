package com.storego.storegoservice.services;

import com.storego.storegoservice.exception.ResourceNotFoundException;
import com.storego.storegoservice.model.*;
import com.storego.storegoservice.repository.CartProductRepository;
import com.storego.storegoservice.repository.CartRepository;
import com.storego.storegoservice.repository.ProductRepository;
import com.storego.storegoservice.services.notifications.NotificationSocketsService;
import com.storego.storegoservice.repository.NotificationRepository;
import com.storego.storegoservice.repository.TransactionRepository;
import com.storego.storegoservice.repository.TransactionProductRepository;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import com.storego.storegoservice.repository.PersonRepository;


@Service
public class StoreServices {

    @Autowired
    private NotificationSocketsService notificationSocketsService;

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

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private TransactionProductRepository transactionProductRepository;

    private int maxClients;

    public StoreServices() {
        this.maxClients = 5;
    }

    public void setMaxClients(int maxClients) {
        this.maxClients = maxClients;
    }

    public void enterStore(Long nif) throws Exception{
        // Get person
        Person p = personRepository.findById(nif).orElseThrow(() -> new ResourceNotFoundException("Person not found for this id :: " + nif));
        String format = "Entered the store!";

        // Check if max number of clients has been reached
        if (cartRepository.count() >= this.maxClients) {
            System.out.println("MAX NUMBER OF CLIENTS HAS BEEN REACHED!");
            Notification n = new Notification(NotificationType.STORE_FULL);
            notificationRepository.save(n);
            notificationSocketsService.sendStoreFull(n);
        }

        // Create cart on database
        if (cartRepository.findByPersonNif(nif) == null) {
            Cart c = new Cart(p);
            cartRepository.save(c);
            p.setLastVisit(new Date());
            personRepository.save(p);
        } else {
            format += "\nERROR! Entered but was already in store!";
        }

        Notification n = new Notification(NotificationType.ENTERED_STORE, nif);
        notificationRepository.save(n);
        notificationSocketsService.sendEnteredStore(n);

        // Output fedback
        System.out.println(String.format("%d (%s) " + format, nif, p.getName()));
    }

    public void leaveStore(Long nif) throws Exception{
        // Get person
        Person p = personRepository.findByNif(nif);
        String format = "Left the store!";

        // Get cart products
        List<CartProduct> products = cartProductRepository.findByCartPersonNif(nif);
        // If cart has products
        if (products.size() > 0) {
            format += " (With " + products.size() + " products)";
            // Create transaction
            Transaction t = new Transaction(p);
            transactionRepository.save(t);
            // Foreach product, add to transaction and delete from cart
            for(CartProduct cp: products){
                // Create transaction product
                Product product = cp.getProduct();
                int units = cp.getUnits();
                TransactionProduct tp = new TransactionProduct(t, product, units);
                transactionProductRepository.save(tp);
                // Delete product from cart
                cartProductRepository.delete(cp);
            }
        } else {
            format += " (Without products)";
        }

        // Delete cart from database
        Cart c = cartRepository.findByPersonNif(nif);
        if (c != null) {
            cartRepository.delete(c);
            if (cartRepository.findByPersonNif(nif) != null) {
                format += "\nERROR! Cart removed but still on database!";
            }
        } else {
            format += "\nERROR! Left but was not in store!";
        }

        Notification n = new Notification(NotificationType.EXITED_STORE, nif);
        notificationRepository.save(n);
        notificationSocketsService.sendExitedStore(n);

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
            }
            else if (units == quantity){
                cartProductRepository.delete(cp);
            }
            else {
                throw(new Exception("More quantity than the units!"));
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

        Integer stock = product.getStock_current();
        if (cp == null) {
            Cart cart = cartRepository.findByPersonNif(nif);
            if (cart == null) throw(new Exception("Cart of client not found!"));
            if (stock >= quantity) {
                cp = new CartProduct(cart, product, quantity);
                cartProductRepository.save(cp);
                product.setStock_current(stock - quantity);
                productRepository.save(product);
                if (product.getStock_minimum() >= product.getStock_current()){
                    Notification n = new Notification(prod_id, quantity, NotificationType.RESTOCK);
                    notificationRepository.save(n);
                    notificationSocketsService.sendRestock(n);
                }
            } else {
                throw(new Exception("Stock is not enough!"));
            }
        } else {
            Integer cp_units = cp.getUnits();
            if (stock >= quantity) {
                cp.setUnits(cp_units + quantity);
                cartProductRepository.save(cp);
                product.setStock_current(stock - quantity);
                productRepository.save(product);
                if (product.getStock_minimum() >= product.getStock_current()){
                    Notification n = new Notification(prod_id, quantity, NotificationType.RESTOCK);
                    notificationRepository.save(n);
                    notificationSocketsService.sendRestock(n);
                }
            } else {
                throw(new Exception("Stock is not enough!"));
            }
        }
    }

    public void notifyHelpNeeded(Long nif, NotificationType type){
        Person p = personRepository.findByNif(nif);
        Notification n = new Notification(p.getNif(), type);
        notificationRepository.save(n);
        notificationSocketsService.sendHelp(n);
    }


}
