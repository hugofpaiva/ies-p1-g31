package com.storego.storegoservice.model;

import javax.persistence.*;

@Entity
@Table(name = "cart_has_product")
public class CartProduct {

    private CartProductKey id;
    private Cart cart;
    private Product product;
    private int units;

    public CartProduct() {}

    @EmbeddedId
    public CartProductKey getId() {
        return id;
    }
    public void setId(CartProductKey id) {
        this.id = id;
    }

    @ManyToOne
    @MapsId("cartId")
    @JoinColumn(name = "cart_id")
    public Cart getCart() {
        return cart;
    }
    public void setCart(Cart cart) {
        this.cart = cart;
    }

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    public Product getProduct() {
        return product;
    }
    public void setProduct(Product product) {
        this.product = product;
    }

    @Column(name = "units", nullable = false)
    public int getUnits() {
        return units;
    }
    public void setUnits(int units) {
        this.units = units;
    }

}