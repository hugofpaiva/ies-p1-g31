package com.storego.storegoservice.model;

import lombok.Data;
import org.springframework.data.annotation.Transient;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Data
@Table(name = "cart_has_product")
public class CartProduct implements Serializable {

    @EmbeddedId
    private CartProductKey id = new CartProductKey();

    @ManyToOne(optional = false)
    @MapsId("cartId")
    @JoinColumn(name = "cart_id", nullable = false)
    private Cart cart;

    @ManyToOne(optional = false)
    @MapsId("productId")
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "units", nullable = false)
    private int units;

    public CartProduct() {}

    public CartProduct(Cart cart, Product product, int units) {
        this.cart = cart;
        this.product = product;
        this.units = units;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CartProduct that = (CartProduct) o;
        return id.equals(that.id) &&
                cart.equals(that.cart) &&
                product.equals(that.product);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, cart, product);
    }
}