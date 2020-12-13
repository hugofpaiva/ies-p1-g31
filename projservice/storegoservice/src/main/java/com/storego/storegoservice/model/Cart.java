package com.storego.storegoservice.model;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "cart")
public class Cart {

    private int nif_cliente;
    private Set<CartProduct> cartproducts;

    public Cart() {}

    @Id
    @OneToOne(mappedBy="nif")
    @JoinColumn(name = "nif_cliente")
    public int getNif_cliente() {
        return nif_cliente;
    }
    public void setNif_cliente(int nif_cliente) {
        this.nif_cliente = nif_cliente;
    }

    @OneToMany(mappedBy="cart")
    public Set<CartProduct> getCartproducts() {
        return cartproducts;
    }
    public void setCartproducts(Set<CartProduct> cartproducts) {
        this.cartproducts = cartproducts;
    }
}