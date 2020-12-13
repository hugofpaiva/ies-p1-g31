package com.storego.storegoservice.services.messaging;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class Consumer {

    @KafkaListener(topics="new-data")
    public void consume(String message) throws IOException {
        System.out.println(message);
    }
}
