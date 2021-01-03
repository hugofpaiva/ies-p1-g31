package com.storego.storegoservice.services;
import com.storego.storegoservice.model.*;
import com.storego.storegoservice.repository.CartProductRepository;
import com.storego.storegoservice.repository.CartRepository;
import com.storego.storegoservice.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Set;
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


    public StoreServices() {

    }

    public void enterStore(Long nif){
        Person p = personRepository.findByNif(nif);
        Cart c = new Cart(p);
        cartRepository.save(c);
        p.setLastVisit(new Date());
        personRepository.save(p);
    }

    public void leaveStore(Long nif){
        Set<CartProduct> products = cartProductRepository.findByCartPersonNif(nif);
        for(CartProduct p: products){
            cartProductRepository.delete(p);
        }
        Cart c = cartRepository.findByPersonNif(nif);
        cartRepository.delete(c);
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
