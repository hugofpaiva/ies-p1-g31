package com.storego.storegoservice.services.messaging;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.storego.storegoservice.model.NotificationType;
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
                System.out.println(result);
                service.enterStore(Long.valueOf((Integer) result.get("nif")));
                break;
            case "leaving-store":
                System.out.println(result);
                service.leaveStore(Long.valueOf((Integer) result.get("nif")));
                break;
            case "adding-product":
                System.out.println("adding-product - " + result);
                break;
            case "removing-product":
                System.out.println("removing-product - " + result);
                break;
            case "help-needed":
                System.out.println("help-needed - " + result);
                service.notifyHelpNeeded(Long.valueOf((Integer) result.get("nif")), NotificationType.HELP);
                break;
            default:
                System.out.println("Event not supported!");
                break;
        }
    }
}
