package com.storego.storegoservice.controller;

import com.storego.storegoservice.configuration.JwtTokenUtil;
import com.storego.storegoservice.exception.ResourceNotFoundException;
import com.storego.storegoservice.model.*;
import com.storego.storegoservice.repository.PersonRepository;
import com.storego.storegoservice.services.UpdateScriptGeneratorService;
import com.storego.storegoservice.services.StoreServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.*;


@RestController
public class PersonController {
    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private StoreServices service;

    @Autowired
    private UpdateScriptGeneratorService updateScriptGeneratorService;

    @GetMapping("/admin/persons")
    public List<Person> getAllClients() {
        return personRepository.findAllByType(PersonType.CLIENT);
    }

    @GetMapping("/admin/new-limit")
    public ResponseEntity<Map<String, Object>> setNewLimit(@RequestParam int limit){
            if(limit>0){
                service.setMaxClients(limit);
                updateScriptGeneratorService.newLimit(limit);
            }else{
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }

            Map<String, Object> response = new HashMap<>();
            response.put("confirm", "ok");
            return new ResponseEntity<>(response, HttpStatus.OK);

    }

    @GetMapping("/work/num_limit")
    public Map<String, Integer> getNumLimitPersonsInStore() {
        Map<String, Integer> response = new HashMap<>();
        response.put("limit_persons_in_store", service.getMaxClients());
        return response;
    }

    @GetMapping("/work/person/")
    public ResponseEntity<Person> getPersonDetails(HttpServletRequest request) throws ResourceNotFoundException {
        String requestTokenHeader = request.getHeader("Authorization");
        String jwtToken = requestTokenHeader.substring(7);
        String email = jwtTokenUtil.getUsernameFromToken(jwtToken);

        Person person = personRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Person not found for this email: " + email));
        return ResponseEntity.ok(person);
    }

    @PutMapping("/work/person/")
    public ResponseEntity<Person> updatePerson(HttpServletRequest request, @Valid @RequestBody Person p) throws ResourceNotFoundException {
        String requestTokenHeader = request.getHeader("Authorization");
        String jwtToken = requestTokenHeader.substring(7);
        String email = jwtTokenUtil.getUsernameFromToken(jwtToken);

        Person person = personRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Person not found for this email: " + email));

        if (p.getName() != null) {
            person.setName(p.getName());
        }
        if (p.getEmail() != null) {
            person.setEmail(p.getEmail());
        }
        if (p.getPassword() != null) {
            person.setPassword(bcryptEncoder.encode(p.getPassword()));
        }

        Person updatedPer = personRepository.save(person);
        return ResponseEntity.ok(updatedPer);
    }


    @GetMapping("/work/last_persons_in_store")
    public Set<Person> getLastPersonsInStore() {
        return personRepository.findDistinctTop10ByLastVisitIsNotNullOrderByLastVisitDesc();
    }

    @GetMapping("/admin/persons/{nif}")
    public ResponseEntity<Person> getPersonById(@PathVariable(value = "nif") Long personNif)
            throws ResourceNotFoundException {
        Person person = personRepository.findById(personNif)
                .orElseThrow(() -> new ResourceNotFoundException("Person not found for this id :: " + personNif));
        return ResponseEntity.ok().body(person);
    }



}
