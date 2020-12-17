package com.storego.storegoservice.controller;

import com.storego.storegoservice.model.Person;
import com.storego.storegoservice.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
public class AuthController {
    @Autowired
    private PersonRepository personRepository;

    //Not finished
    @PostMapping("/login")
    public Person createPerson(@Valid @RequestBody Person person) {
        return personRepository.save(person);
    }
}
