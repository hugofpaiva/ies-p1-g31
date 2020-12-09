package com.storego.storegoservice.controller;

import com.storego.storegoservice.exception.ResourceNotFoundException;
import com.storego.storegoservice.model.Notification;
import com.storego.storegoservice.model.Person;
import com.storego.storegoservice.repository.NotificationRepository;
import com.storego.storegoservice.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@EnableMongoRepositories(basePackageClasses = NotificationRepository.class)
@EnableJpaRepositories(basePackageClasses = {PersonRepository.class})
@RestController
@RequestMapping("/api")
public class PersonController {
    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @GetMapping("/persons")
    public List<Person> getAllPersons() {
        return personRepository.findAll();
    }

    @GetMapping("/persons/{id}")
    public ResponseEntity<Person> getPersonById(@PathVariable(value = "id") Long personId)
            throws ResourceNotFoundException {
        Person person = personRepository.findById(personId)
                .orElseThrow(() -> new ResourceNotFoundException("Person not found for this id :: " + personId));
        return ResponseEntity.ok().body(person);
    }

    @PostMapping("/persons")
    public Person createPerson(@Valid @RequestBody Person person) {
        return personRepository.save(person);
    }

    @PutMapping("/persons/{id}")
    public ResponseEntity<Person> updatePerson(@PathVariable(value = "id") Long personId,
                                                   @Valid @RequestBody Person personDetails) throws ResourceNotFoundException {
        Person person = personRepository.findById(personId)
                .orElseThrow(() -> new ResourceNotFoundException("Person not found for this id :: " + personId));

        person.setEmail(personDetails.getEmail());
        person.setLastName(personDetails.getLastName());
        person.setFirstName(personDetails.getFirstName());
        final Person updatedPerson = personRepository.save(person);
        return ResponseEntity.ok(updatedPerson);
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
