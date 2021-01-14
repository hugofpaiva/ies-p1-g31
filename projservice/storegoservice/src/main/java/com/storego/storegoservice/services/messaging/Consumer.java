package com.storego.storegoservice.services.messaging;

import com.storego.storegoservice.model.NotificationType;
import com.storego.storegoservice.services.InitScriptGeneratorService;
import com.storego.storegoservice.services.StoreServices;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.IOException;


@Service
public class Consumer {

    @Autowired
    private StoreServices service;

    @Autowired
    private InitScriptGeneratorService initScriptGeneratorService;

    @KafkaListener(topics="storego-new")
    public void consume(String message) throws IOException {
        JSONObject obj = new JSONObject(message);
        System.out.println(message);
        switch (obj.getString("type")){
            case "entering-store":
                try{
                service.enterStore(obj.getLong("nif"));
                } catch (Exception e){
                    System.err.println(e.getMessage());
                }
                break;
            case "leaving-store":
                try{
                service.leaveStore(obj.getLong("nif"));
                } catch (Exception e){
                    System.err.println(e.getMessage());
                }
                break;
            case "adding-product":
                try {
                    service.addProductToCart(obj.getLong("nif"), obj.getLong("idProduct"), obj.getInt("qty"));
                } catch (Exception e){
                    System.err.println(e.getMessage());
                }
                break;
            case "removing-product":
                try {
                    service.removeProductFromCart(obj.getLong("nif"), obj.getLong("idProduct"), obj.getInt("qty"));
                } catch (Exception e){
                    System.err.println(e.getMessage());
                }
                break;
            case "help-needed":
                try {
                    service.notifyHelpNeeded(obj.getLong("nif"), NotificationType.HELP);
                } catch (Exception e){
                    System.err.println(e.getMessage());
                }
                break;
            case "initialize-people-request":
                System.out.println("initialize-people-req");
                try {
                    initScriptGeneratorService.everybodyOut();
                    initScriptGeneratorService.initPeopleReq();
                } catch (Exception e){
                    System.err.println(e.getMessage());
                }
                break;
            case "initialize-products-request":
                System.out.println("initialize-products-req");
                try {
                    initScriptGeneratorService.initProductsReq();
                } catch (Exception e){
                    System.err.println(e.getMessage());
                }
                break;
            case "initialize-people":
                JSONObject data_ppl = obj.getJSONObject("data");
                try {
                    initScriptGeneratorService.initPeople(data_ppl);
                } catch (Exception e){
                    System.err.println(e.getMessage());
                }
                break;
            case "initialize-categories":
                JSONArray arr = obj.getJSONArray("data");
                try {
                    initScriptGeneratorService.initCategories(arr);
                } catch (Exception e){
                    System.err.println(e.getMessage());
                }
                break;
            case "initialize-products":
                JSONObject data_prod = obj.getJSONObject("data");
                try {
                    initScriptGeneratorService.initProducts(data_prod);
                } catch (Exception e){
                    System.err.println(e.getMessage());
                }
                break;
            default:
                System.err.println("Event not supported!");
                break;
        }
    }
}
