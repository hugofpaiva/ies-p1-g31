package com.storego.storegoservice.services.messaging;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationConfig;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.storego.storegoservice.model.NotificationType;
import com.storego.storegoservice.services.InitScriptGenerator;
import com.storego.storegoservice.services.StoreServices;
import org.json.JSONObject;
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
                try{
                service.enterStore(Long.valueOf((Integer) result.get("nif")));
                } catch (Exception e){
                    System.err.println(e.getMessage());
                }
                break;
            case "leaving-store":
                try{
                service.leaveStore(Long.valueOf((Integer) result.get("nif")));
                } catch (Exception e){
                    System.err.println(e.getMessage());
                }
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
                try{
                service.notifyHelpNeeded(Long.valueOf((Integer) result.get("nif")), NotificationType.HELP);
                } catch (Exception e){
                    System.err.println(e.getMessage());
                }
                break;
            default:
                System.err.println("Event not supported!");
                break;
        }
    }


    @Autowired
    private InitScriptGenerator init;

    @KafkaListener(topics="initialization")
    public void consumeInit(String message) throws Exception {
        JSONObject obj = new JSONObject(message);
        System.out.println("INITIALIZING: " +obj.getString("type"));
        switch (obj.getString("type")){
            case "initialize-people-request":
                System.out.println("initialize-people-req");
                try {
                    init.initPeopleReq();
                } catch (Exception e){
                    System.out.println("FODEU dEU ERRO");
                    System.err.println(e.getMessage());
                }
                break;
            case "initialize-products-request":
                System.out.println("initialize-products-req");
                try {
                    init.initProductsReq();
                } catch (Exception e){
                    System.err.println(e.getMessage());
                }
                break;
            case "initialize-people":
                JSONObject data_ppl = obj.getJSONObject("data");
                Map<String, Object> people = new ObjectMapper().readValue(data_ppl.toString(), HashMap.class);
                System.out.println("FUCK THAT SHIT: "+people);
                System.out.println("initialize-people - " + people);
                try {
                    init.initPeople(people);
                } catch (Exception e){
                    System.err.println(e.getMessage());
                }
                break;
            case "initialize-categories":
                String str = (String) obj.get("data");
                String[] categories = str.split(",");
                System.out.println("initialize-categories - " + categories);
                try {
                    init.initCategories(categories);
                } catch (Exception e){
                    System.err.println(e.getMessage());
                }
                break;
            case "initialize-products":
                JSONObject data_prod = obj.getJSONObject("data");
                Map<String, Object> products = new ObjectMapper().readValue(data_prod.toString(), HashMap.class);
                System.out.println("initialize-products - " + products);
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
