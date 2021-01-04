package com.storego.storegoservice.controller;

import com.storego.storegoservice.exception.ResourceNotFoundException;
import com.storego.storegoservice.model.Person;
import com.storego.storegoservice.model.PersonType;
import com.storego.storegoservice.repository.NotificationRepository;
import com.storego.storegoservice.repository.PersonRepository;
import com.storego.storegoservice.services.StoreServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;


@RestController
public class PersonController {
    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private StoreServices service;

    @GetMapping("/admin/persons")
    public List<Person> getAllClients() {
        return personRepository.findAllByType(PersonType.CLIENT);
    }


    @GetMapping("work/last_persons_in_store")
    public Set<Person> getLastPersonsInStore() {
        return personRepository.findDistinctTop10ByLastVisitIsNotNullOrderByLastVisitDesc();
    }

    @GetMapping("admin/persons/{nif}")
    public ResponseEntity<Person> getPersonById(@PathVariable(value = "nif") Long personNif)
            throws ResourceNotFoundException {
        Person person = personRepository.findById(personNif)
                .orElseThrow(() -> new ResourceNotFoundException("Person not found for this id :: " + personNif));
        return ResponseEntity.ok().body(person);
    }



}
