package com.storego.storegoservice.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.storego.storegoservice.model.Product;
import com.storego.storegoservice.services.messaging.Producer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class DataGeneratorComService {

    @Autowired
    private Producer producer;

    public void helpGiven(long nif){
        Map<String, Object> elements = new HashMap();
        elements.put("type", "help-given");
        elements.put("nif", nif);

        ObjectMapper objectMapper = new ObjectMapper();

        try {
            String json = objectMapper.writeValueAsString(elements);
            producer.sendMessage(json);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

    public void newLimit(Integer limit){
        Map<String, Object> elements = new HashMap();
        elements.put("type", "new-limit");
        elements.put("qty", limit);

        ObjectMapper objectMapper = new ObjectMapper();

        try {
            String json = objectMapper.writeValueAsString(elements);
            producer.sendMessage(json);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

    public void addProduct(Product product){
        Map<String, Object> elements = new HashMap();
        elements.put("type", "add-product");
        elements.put("id", product.getId());
        elements.put("qty", product.getStock_current());

        ObjectMapper objectMapper = new ObjectMapper();

        try {
            String json = objectMapper.writeValueAsString(elements);
            producer.sendMessage(json);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

    public void deleteProduct(Product product){
        Map<String, Object> elements = new HashMap();
        elements.put("type", "remove-product");
        elements.put("id", product.getId());

        ObjectMapper objectMapper = new ObjectMapper();

        try {
            String json = objectMapper.writeValueAsString(elements);
            producer.sendMessage(json);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

    public void restockProduct(Integer quantity, Product product){
        Map<String, Object> elements = new HashMap();
        elements.put("type", "restock");
        elements.put("id", product.getId());
        elements.put("qty", quantity);

        ObjectMapper objectMapper = new ObjectMapper();

        try {
            String json = objectMapper.writeValueAsString(elements);
            producer.sendMessage(json);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }
}
