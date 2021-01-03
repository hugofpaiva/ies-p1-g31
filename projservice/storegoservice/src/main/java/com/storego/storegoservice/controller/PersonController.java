package com.storego.storegoservice.controller;

import com.storego.storegoservice.exception.ResourceNotFoundException;
import com.storego.storegoservice.model.Notification;
import com.storego.storegoservice.model.Person;
import com.storego.storegoservice.repository.CartRepository;
import com.storego.storegoservice.repository.NotificationRepository;
import com.storego.storegoservice.repository.PersonRepository;
import com.storego.storegoservice.services.StoreServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@EnableMongoRepositories(basePackageClasses = NotificationRepository.class)
@EnableJpaRepositories(basePackageClasses = {PersonRepository.class, CartRepository.class})
@RestController
public class PersonController {
    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private StoreServices service;

    @GetMapping("/work/persons")
    public List<Person> getAllPersons() {
        return personRepository.findAll();
    }


    @GetMapping("work/persons_in_store")
    public Set<Person> getPersonsInStore() {
        return cartRepository.findDistinctPerson();
    }

    @GetMapping("work/num_persons_in_store")
    public Integer getNumPersonsInStore() {
        return cartRepository.countDistinctPerson();
    }

    @GetMapping("work/last_persons_in_store")
    public Set<Person> getLastPersonsInStore() {
        return personRepository.findDistinctTop10ByLastVisitIsNotNullOrderByLastVisitDesc();
    }



    @GetMapping("/persons/{id}")
    public ResponseEntity<Person> getPersonById(@PathVariable(value = "id") Long personId)
            throws ResourceNotFoundException {
        Person person = personRepository.findById(personId)
                .orElseThrow(() -> new ResourceNotFoundException("Person not found for this id :: " + personId));
        return ResponseEntity.ok().body(person);
    }


    @DeleteMapping("/persons/{id}")
    public Map<String, Boolean> deletePerson(@PathVariable(value = "id") Long personId)
            throws ResourceNotFoundException {
        Person person = personRepository.findById(personId)
                .orElseThrow(() -> new ResourceNotFoundException("Person not found for this id :: " + personId));

        personRepository.delete(person);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
