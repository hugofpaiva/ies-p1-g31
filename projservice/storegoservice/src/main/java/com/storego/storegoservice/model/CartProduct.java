package com.storego.storegoservice.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "cart_has_product")
public class CartProduct {

    @EmbeddedId
    private CartProductKey id;

    @ManyToOne
    @MapsId("cartId")
    @JoinColumn(name = "cart_id")
    private Cart cart;

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name = "units", nullable = false)
    private int units;

    public CartProduct() {}

}