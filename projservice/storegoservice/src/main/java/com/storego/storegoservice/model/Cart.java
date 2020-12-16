package com.storego.storegoservice.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Entity
@Data
@Table(name = "cart")
public class Cart {

    @Id
    @Column(name = "person_id")
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "person_id")
    private Person person;

    @OneToMany(mappedBy="cart")
    Set<CartProduct> products;

    public Cart() {}

}