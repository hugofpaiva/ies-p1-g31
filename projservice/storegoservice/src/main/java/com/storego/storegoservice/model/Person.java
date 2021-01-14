package com.storego.storegoservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Objects;


@Entity // This tells Hibernate to make a table out of this class
@Data
@Table(name = "person")
public class Person implements Serializable {

    // Attributes
    @Id
    @Column(name = "nif", nullable = false)
    private long nif;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @JsonIgnore
    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "last_visit")
    private Date lastVisit;

    @Column(name = "type", nullable = false)
    @Enumerated(EnumType.ORDINAL)
    private PersonType type;

    // Constructors
    public Person() {
    }

    public Person(long nif, String name, String email, String password, PersonType type) {
        this.nif = nif;
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Person person = (Person) o;
        return nif == person.nif;
    }

    @Override
    public int hashCode() {
        return Objects.hash(nif);
    }
}