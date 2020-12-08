package com.storego.storegoservice.services;

import com.storego.storegoservice.exception.EtAuthException;
import com.storego.storegoservice.model.Person;

public interface PersonService {

    Person validatePerson(String email, String password) throws EtAuthException;

    Person registerPerson(String firstName, String lastName, String email, String password) throws EtAuthException;
}
