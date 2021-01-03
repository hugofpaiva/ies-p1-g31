package com.storego.storegoservice.services.messaging;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.storego.storegoservice.services.StoreServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class Consumer {

    @Autowired
    private StoreServices service;

    @KafkaListener(topics="costumer-events")
    public void consume(String message) throws IOException {
        Map<String,Object> result = new ObjectMapper().readValue(message, HashMap.class);
        System.out.println("\n" + result.toString());
        switch ((String) result.get("type")){
            case "entering-store":
                service.enterStore(Long.valueOf((Integer) result.get("nif")));
                break;
            case "leaving-store":
                service.leaveStore(Long.valueOf((Integer) result.get("nif")));
                break;
            case "adding-product":
                System.out.println("adding-product - " + result);
                try {
                    service.addProductToCart(Long.valueOf((Integer) result.get("nif")), Long.valueOf((Integer) result.get("idProduct")), (Integer) result.get("qty"));
                } catch (Exception e){
                    System.err.println(e.getMessage());
                }
                break;
            case "removing-product":
                System.out.println("removing-product - " + result);
                try {
                    service.removeProductFromCart(Long.valueOf((Integer) result.get("nif")), Long.valueOf((Integer) result.get("idProduct")), (Integer) result.get("qty"));
                } catch (Exception e){
                    System.err.println(e.getMessage());
                }
                break;
            case "help-needed":
                break;
            default:
                System.out.println("Event not supported!");
                break;
        }
    }
}
