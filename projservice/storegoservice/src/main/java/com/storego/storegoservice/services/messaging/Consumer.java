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
        Map<String,Object> result =
                new ObjectMapper().readValue(message, HashMap.class);
        switch ((String) result.get("type")){
            case "entering-store":
                service.enterStore(Long.valueOf((Integer) result.get("nif")));
            case "leaving-store":
                service.enterStore(Long.valueOf((Integer) result.get("nif")));
            case "adding-product":
                System.out.println("adding-product");
                System.out.println(result);
            case "removing-product":
                System.out.println("removing-product");
                System.out.println(result);
            case "help-needed":
                System.out.println("help-needed");
                System.out.println(result);
            default:
                System.out.println("Event not supported!");
        }
    }
}
