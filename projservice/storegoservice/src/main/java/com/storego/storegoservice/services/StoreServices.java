package com.storego.storegoservice.services;
import com.storego.storegoservice.model.Notification;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class StoreServices {

    // Annotation required to listen
    // the message from Kafka server
    @KafkaListener(
        topics = "costumer-events",
        groupId = "id",
        containerFactory = "notificationListener"
    )
    public void
    publish(Notification notification)
    {
        System.out.println(
            "New Entry: " + notification
        );
    }
}
