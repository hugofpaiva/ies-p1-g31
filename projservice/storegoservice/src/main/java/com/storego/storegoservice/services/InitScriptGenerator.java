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

    public void initPeople(Map<Long,Object> result) {
        for (Map.Entry<Long, Object> r : result.entrySet()){
            String[] person = ((String) r.getValue()).split(",");
            String name = (String) person[0];
            String email = (String) person[1];
            String password = (String) person[2];
            personRepository.save(new Person(r.getKey(), name, email, password, PersonType.CLIENT));
            System.out.println("INIT PERSON:" + personRepository.findByNif(r.getKey()));
        }
    }

    public void initCategories(String[] result) {
        for(String r : result) {
            ProductCategory pc = new ProductCategory(r);
            productCategoryRepository.save(pc);
        }
    }

    public void initProducts(Map<Long,Object> result) {
        for (Map.Entry<Long, Object> r : result.entrySet()){
            String[] product = ((String) r.getValue()).split(",");
            System.out.print("PRODUCTTTT-> "+product);
            double price = Double.parseDouble(product[0]);
            String name = (String) product[1];
            String description = (String) product[2];
            int stock = Integer.parseInt(product[3]);
            int min_stock = Integer.parseInt(product[4]);
            ProductCategory category = new ProductCategory(product[5]);
            productRepository.save(new Product(r.getKey(), price, name, description, stock, min_stock,category));
        }

    }
}
