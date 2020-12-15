package com.storego.storegoservice.services;
import com.storego.storegoservice.model.Notification;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.HashSet;

// Connection to DB
import org.springframework.beans.factory.annotation.Autowired;
import com.storego.storegoservice.exception.ResourceNotFoundException;
import com.storego.storegoservice.repository.PersonRepository;
import com.storego.storegoservice.model.Person;

@Service
public class StoreServices {

    @Autowired
    private PersonRepository personRepository;
    private Set<Person> clientsInStore;

    public StoreServices() {
        this.clientsInStore = new HashSet<>();
    }

    // Annotation required to listen
    // the message from Kafka server
    @KafkaListener(
        topics = "costumer-events",
        groupId = "id",
        containerFactory = "notificationListener"
    )
    public void
    publish(Notification notification)
    throws ResourceNotFoundException
    {
        System.out.println(
            "\nNew Entry: " + notification
        );

        // Get client at DB
        System.out.println(notification.getNif());

        Person client = personRepository.findById(
            notification.getNif()
        ).orElseThrow(
                () -> new ResourceNotFoundException("Person not found for this NIF ")
        );

        // Process entry
        switch(notification.getType()) {
            case "entering-store":
                clientsInStore.add(client);
                // For debugging
                System.out.println("> Client entering store: " + client);
                System.out.print("> Clients in store: ");
                for(Person p:clientsInStore) {
                    System.out.print(p.getNif() + "; ");
                }
                System.out.println();
                break;
            case "leaving-store":
                clientsInStore.remove(client);
                // For debugging
                System.out.println("> Client leaving store: " + client);
                System.out.print("> Clients in store: ");
                for(Person p:clientsInStore) {
                    System.out.print(p.getNif() + "; ");
                }
                System.out.println();
                break;
            default:
                System.out.println("> Notification not supported!");
        }

    }
}
