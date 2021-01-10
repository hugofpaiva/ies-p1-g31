package com.storego.storegoservice.services;

import com.storego.storegoservice.exception.ResourceNotFoundException;
import com.storego.storegoservice.model.*;
import com.storego.storegoservice.services.notifications.NotificationSocketsService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import com.storego.storegoservice.repository.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.storego.storegoservice.services.messaging.Producer;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class InitScriptGeneratorService {

    @Autowired
    private StoreServices storeServices;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    @Autowired
    private Producer producer;

    public void initPeopleReq() {
        List<Person> people = personRepository.findAllByType(PersonType.CLIENT);
        JSONObject json = new JSONObject();
        json.put("type", "initialize-people-response");
        if (!people.isEmpty()) {
            JSONArray array = new JSONArray();
            for (Person p : people) {
                array.put(p.getNif());
            }
            json.put("data", array);
        }
        String message = json.toString();
        System.out.println("Kafka MSG clients" + message);
        producer.sendMessage(message);
    }

    public void everybodyOut() {
        List<Cart> carts = cartRepository.findAll();

        try {
            for (Cart c : carts) {
                storeServices.leaveStore(c.getPerson().getNif());
            }
        }
         catch (Exception e){
            System.err.println(e.getMessage());
        }
    }

    public void initProductsReq() {
        List<Product> products = productRepository.findAll();
        JSONObject json = new JSONObject();
        json.put("type", "initialize-products-response");
        JSONObject data = new JSONObject();
        for(Product p : products) {
            data.put(String.valueOf(p.getId()), p.getStock_current());
        }
        json.put("data", data);
        String message = json.toString();
        System.out.println("Kafka MSG products" + message);
        producer.sendMessage(message);
    }


    public void initPeople(JSONObject result) {
        JSONArray keys = result.names ();

        for (int i = 0; i < keys.length(); i++) {
            String nif = keys.getString(i);
            JSONArray value = result.getJSONArray(nif);
            String name = value.getString(0);
            String email = value.getString(1);
            String password = value.getString(2);
            personRepository.save(new Person(Long.parseLong(nif), name, email, bcryptEncoder.encode(password), PersonType.CLIENT));
        }

        JSONObject json = new JSONObject();
        json.put("type", "initialize-done-people");
        String message = json.toString();
        producer.sendMessage(message);
    }

    public void initCategories(JSONArray result) {
        for (int i = 0; i < result.length(); i++) {
            JSONObject cat = result.getJSONObject(i);
            ProductCategory pc = new ProductCategory(cat.getLong("id"), cat.getString("name"));
            productCategoryRepository.save(pc);
        }

        JSONObject json = new JSONObject();
        json.put("type", "initialize-done-categories");
        String message = json.toString();
        producer.sendMessage(message);
    }

    public void initProducts(JSONObject result) throws ResourceNotFoundException {
        JSONArray keys = result.names ();
        for (int i = 0; i < keys.length(); i++) {
            String id = keys.getString(i);
            JSONArray value = result.getJSONArray(id);
            Double price = value.getDouble(0);
            String name = value.getString(1);
            String descr = value.getString(2);
            Integer stock = value.getInt(3);
            Integer min_stock = value.getInt(4);
            Long idCategory = value.getLong(5);
            ProductCategory pc = productCategoryRepository.findById(idCategory).orElseThrow(() -> new ResourceNotFoundException("Category not found for this id: " + idCategory));
            productRepository.save(new Product(Long.valueOf(id), price, name, descr, stock, min_stock, pc));
        }
        JSONObject json = new JSONObject();
        json.put("type", "initialize-done-products");
        String message = json.toString();
        producer.sendMessage(message);
    }

}
