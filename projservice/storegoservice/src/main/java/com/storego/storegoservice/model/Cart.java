package com.storego.storegoservice.model;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "cart")
public class Cart {

    private int nif;
    private Person client;
    private Set<CartProduct> cartproducts;

    public Cart() {}

    @Id
    public int getNif() {
        return nif;
    }
    public void setNif(int nif) {
        this.nif = nif;
    }

    @OneToOne
    @MapsId
    public Person getClient() {
        return client;
    }
    public void setClient(Person client) {
        this.client = client;
    }

    @OneToMany(mappedBy="cart")
    public Set<CartProduct> getCartproducts() {
        return cartproducts;
    }
    public void setCartproducts(Set<CartProduct> cartproducts) {
        this.cartproducts = cartproducts;
    }

}