package com.storego.storegoservice.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.*;

@Entity
@Data
@Table(name = "cart")
public class Cart implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne(optional = false)
    @JoinColumn(name = "person_id", referencedColumnName = "nif", nullable = false)
    private Person person;


    public Cart() {}

    public Cart(Person person) {
        this.person = person;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Cart cart = (Cart) o;
        return id == cart.id &&
                person.equals(cart.person);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, person);
    }
}