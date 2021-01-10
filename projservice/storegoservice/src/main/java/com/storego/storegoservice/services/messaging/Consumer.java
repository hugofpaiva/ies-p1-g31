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

    @KafkaListener(topics="costumer-events")
    public void consume(String message) throws IOException {
        JSONObject obj = new JSONObject(message);
        System.out.println("INITIALIZING: " +obj.getString("type"));
        switch ((String) obj.get("type")){
            case "entering-store":
                try{
                service.enterStore(Long.valueOf((Integer) obj.get("nif")));
                } catch (Exception e){
                    System.err.println(e.getMessage());
                }
                break;
            case "leaving-store":
                try{
                service.leaveStore(Long.valueOf((Integer) obj.get("nif")));
                } catch (Exception e){
                    System.err.println(e.getMessage());
                }
                break;
            case "adding-product":
                try {
                    service.addProductToCart(Long.valueOf((Integer) obj.get("nif")), Long.valueOf((Integer) obj.get("idProduct")), (Integer) obj.get("qty"));
                } catch (Exception e){
                    System.err.println(e.getMessage());
                }
                break;
            case "removing-product":
                try {
                    service.removeProductFromCart(Long.valueOf((Integer) obj.get("nif")), Long.valueOf((Integer) obj.get("idProduct")), (Integer) obj.get("qty"));
                } catch (Exception e){
                    System.err.println(e.getMessage());
                }
                break;
            case "help-needed":
                try {
                    service.notifyHelpNeeded(Long.valueOf((Integer) obj.get("nif")), NotificationType.HELP);
                } catch (Exception e){
                    System.err.println(e.getMessage());
                }
                break;
            case "initialize-people-request":
                System.out.println("initialize-people-req");
                try {
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
