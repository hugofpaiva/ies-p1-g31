package com.storego.storegoservice.services.messaging;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.storego.storegoservice.model.NotificationType;
import com.storego.storegoservice.services.InitScriptGenerator;
import com.storego.storegoservice.services.StoreServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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
                    service.removeProductFromCart(Long.valueOf((Integer) result.get("nif")), Long.valueOf((Integer) result.get("id")), (Integer) result.get("qty"));
                } catch (Exception e){
                    System.err.println(e.getMessage());
                }
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


    @Autowired
    private InitScriptGenerator init;

    @KafkaListener(topics="initialization")
    public void consumeInit(String message) throws Exception {
        Map<String,Object> result = new ObjectMapper().readValue(message, HashMap.class);
        System.out.println("\n" + result.toString());
        switch ((String) result.get("type")){
            case "initialize-people-request":
                System.out.println("initialize-people-req - " + result);
                try {
                    init.initPeopleReq();
                } catch (Exception e){
                    System.err.println(e.getMessage());
                }
                break;
            case "initialize-products-request":
                System.out.println("initialize-products-req - " + result);
                try {
                    init.initProductsReq();
                } catch (Exception e){
                    System.err.println(e.getMessage());
                }
                break;
            case "initialize-people":
                Map<Long,Object> people = new ObjectMapper().readValue((String) result.get("data"), HashMap.class);
                System.out.println("initialize-people - " + people);
                try {
                    init.initPeople(people);
                } catch (Exception e){
                    System.err.println(e.getMessage());
                }
                break;
            case "initialize-categories":
                System.out.println("initialize-categories - " + result);
                String str = (String) result.get("data");
                String[] categories = str.split(",");
                try {
                    init.initCategories(categories);
                } catch (Exception e){
                    System.err.println(e.getMessage());
                }
                break;
            case "initialize-products":
                Map<Long,Object> products = new ObjectMapper().readValue((String) result.get("data"), HashMap.class);
                System.out.println("initialize-products - " + products);
                System.out.println("WTFUUUUUCK"+products);
                try {
                    init.initProducts(products);
                } catch (Exception e){
                    System.err.println(e.getMessage());
                }
                break;
            default:
                System.out.println("Event not supported!");
                break;
        }
    }
}
