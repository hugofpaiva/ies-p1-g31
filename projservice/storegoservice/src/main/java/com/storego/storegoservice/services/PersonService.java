package com.storego.storegoservice.services;

import com.storego.storegoservice.exception.EtAuthException;
import com.storego.storegoservice.model.Person;
import com.storego.storegoservice.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.regex.Pattern;

@Service
@Transactional
public class PersonService {
    @Autowired
    private PersonRepository personRepository;

    public Person validatePerson(String email, String password) throws EtAuthException{

    }

    public Person registerPerson(Person p) throws EtAuthException{
        Pattern pattern = Pattern.compile("^(.+)@(.+)$");
        if (!pattern.matcher(p.getEmail()).matches())
            throw new EtAuthException("Invalid email format");
        Integer count = personRepository.countByEmail(p.getEmail());
        if (count > 0)
            throw new EtAuthException("Email already in use")
        return personRepository.save(p);

    }


}
