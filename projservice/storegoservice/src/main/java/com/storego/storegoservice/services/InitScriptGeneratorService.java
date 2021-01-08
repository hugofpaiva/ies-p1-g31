package com.storego.storegoservice.services;

import com.storego.storegoservice.exception.ResourceNotFoundException;
import com.storego.storegoservice.model.*;
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
        JSONArray array = new JSONArray();
        for(Person p : people) {
            array.put(p.getNif());
        }
        json.put("data", array);
        String message = json.toString();
        System.out.println("Kafka MSG clients" + message);
        producer.sendMessage(message);
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
            String name = (String) value.get(0);
            String email = (String) value.get(1);
            String password = (String) value.get(2);
            personRepository.save(new Person(Long.parseLong(nif), name, email, bcryptEncoder.encode(password), PersonType.CLIENT));
        }
    }

    public void initCategories(JSONArray result) {
        for (int i = 0; i < result.length(); i++) {
            JSONObject cat = result.getJSONObject(i);
            ProductCategory pc = new ProductCategory(cat.getLong("id"), cat.getString("name"));
            productCategoryRepository.save(pc);
        }
    }

    public void initProducts(JSONObject result) throws ResourceNotFoundException {
        JSONArray keys = result.names ();
        for (int i = 0; i < keys.length(); i++) {
            String id = keys.getString(i);
            JSONArray value = result.getJSONArray(id);
            Double price = Double.valueOf((String) value.get(0));
            String name = (String) value.get(1);
            String descr = (String) value.get(2);
            Integer stock = Integer.valueOf((String) value.get(3));
            Integer min_stock = Integer.valueOf((String) value.get(4));
            Long idCategory = Long.valueOf((String) value.get(5));
            ProductCategory pc = productCategoryRepository.findById(idCategory).orElseThrow(() -> new ResourceNotFoundException("Category not found for this id: " + idCategory));
            productRepository.save(new Product(Long.valueOf(id), price, name, descr, stock, min_stock, pc));
        }
    }

}
