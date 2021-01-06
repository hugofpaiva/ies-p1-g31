package com.storego.storegoservice.services;

import com.storego.storegoservice.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.storego.storegoservice.repository.*;
import org.springframework.stereotype.Service;
import com.storego.storegoservice.services.messaging.Producer;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class InitScriptGenerator {

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    @Autowired
    private Producer producer;

    public void initPeopleReq() {
        List<Person> people = personRepository.findAll();
        List<Long> clients = new ArrayList<>();
        people.forEach(p -> {
            if (p.getType().toString().equals("CLIENT")) clients.add(p.getNif());
        });
        String message = "{\n" +
                "\"type\":\"initialize-people-response\",\n" +
                "\"data\":" + clients +
                "\n}";
        System.out.println("Kafka MSG clients" + message);
        producer.sendMessage(message);
    }

    public void initProductsReq() {
        List<Product> products = productRepository.findAll();
        StringBuilder pmessage = new StringBuilder();
        products.forEach(p -> pmessage.append(p.toString()).append(",\n"));
        String message = "{\n" +
                "\"type\":\"initialize-products-response\",\n" +
                "\"data\": {\n" +
                        pmessage +
                        "\n}" +
                "\n}";
        message.replace("'","\"");
        System.out.println("Kafka MSG products" + message);
        producer.sendMessage(message);
    }


    public void initPeople(Map<String,Object> result) {
        for (Map.Entry<String, Object> r : result.entrySet()){
            String[] person = r.getValue().toString().split(",");
            String name = person[0].substring(1);
            String email = person[1];
            String password = person[2].substring(0, person[2].length()-1);
            System.out.println("PERSON: " + r.getKey() + " - " + name + " - " + email + " - " + password);
            personRepository.save(new Person(Long.parseLong(r.getKey()), name, email, password, PersonType.CLIENT));
            System.out.println("INIT PERSON:" + personRepository.findByNif(Long.parseLong(r.getKey())) + "\n\n");
        }
    }

    public void initCategories(String[] result) {
        for(String r : result) {
            ProductCategory pc = new ProductCategory(r);
            productCategoryRepository.save(pc);
        }
    }

    public void initProducts(Map<String, Object> result) {
        for (Map.Entry<String, Object> r : result.entrySet()){
            String[] product = r.getValue().toString().split(",");
            double price = Double.parseDouble(product[0].substring(1));
            String name = product[1];
            String description = product[2];
            int stock = Integer.parseInt(product[3].strip());
            int min_stock = Integer.parseInt(product[4].strip());
            ProductCategory category = new ProductCategory(product[5].substring(0,product[5].length()-1));
            productCategoryRepository.save(category);
            System.out.println("PRODUCT: " + r.getKey() + " - " + name + " - " + description + " - " + stock +  " - " + min_stock +  " - " + category.toString());
            productRepository.save(new Product(Long.parseLong(r.getKey()), price, name, description, stock, min_stock,category));
            System.out.println("INIT PRODUCT:" + productRepository.findById(Long.parseLong(r.getKey())) + "\n\n");
        }
    }

}
