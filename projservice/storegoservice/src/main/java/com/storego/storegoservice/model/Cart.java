package com.storego.storegoservice.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Objects;
import java.util.Set;

@Entity
@Data
@Table(name = "cart")
public class Cart {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne
    @JoinColumn(name = "person_id", referencedColumnName = "nif")
    private Person person;

    @OneToMany(mappedBy="cart", cascade = CascadeType.ALL)
    Set<CartProduct> products;

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