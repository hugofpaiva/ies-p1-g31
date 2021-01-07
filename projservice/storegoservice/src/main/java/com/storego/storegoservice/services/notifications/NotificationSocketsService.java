package com.storego.storegoservice.services.notifications;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.storego.storegoservice.model.Notification;
import com.storego.storegoservice.model.NotificationType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;


@Service
public class NotificationSocketsService {
    @Autowired
    private SimpMessagingTemplate template;

    public String toJson(Notification not) throws JsonProcessingException {
        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        return ow.writeValueAsString(not);
    }

    public void sendHelp(Notification notification){
        try {
            template.convertAndSend("/topic/help", toJson(notification));
        } catch (Exception e){
            System.err.println("Error sending Help notification for WebSockets");
        }
    }

    public void sendEnteredStore(Notification notification){
        try {
            template.convertAndSend("/topic/enter_store", toJson(notification));
        } catch (Exception e){
            System.err.println("Error sending Entered Store notification for WebSockets");
        }
    }

    public void sendExitedStore(Notification notification){
        try {
            template.convertAndSend("/topic/exit_store", toJson(notification));
        } catch (Exception e){
            System.err.println("Error sending Exited Store notification for WebSockets");
        }
    }

    public void sendRestock(Notification notification){
        try {
            template.convertAndSend("/topic/restock", toJson(notification));
        } catch (Exception e){
            System.err.println("Error sending Restock notification for WebSockets");
        }
    }

    public void sendStoreFull(Notification notification){
        try {
            template.convertAndSend("/topic/store_full", toJson(notification));
        } catch (Exception e){
            System.err.println("Error sending Store Full notification for WebSockets");
        }
    }

}
