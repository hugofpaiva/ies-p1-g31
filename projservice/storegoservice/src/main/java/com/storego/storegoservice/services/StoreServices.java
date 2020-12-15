package com.storego.storegoservice.services;
import com.storego.storegoservice.model.Person;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class StoreServices {

    // Annotation required to listen
    // the message from Kafka server
    @KafkaListener(topics = "JsonTopic",
            groupId = "id", containerFactory
            = "personListner")
    public void
    publish(Person person)
    {
        System.out.println("New Entry: "
                + person);
    }
}
