package com.storego.storegoservice.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
class CartProductKey implements Serializable {

    private int cartId;
    private long productId;

    public CartProductKey() {}

    @Column(name = "card_id")
    public int getCartId() {
        return cartId;
    }
    public void setCartId(int cartId) {
        this.cartId = cartId;
    }

    @Column(name = "product_id")
    public long getProductId() {
        return productId;
    }
    public void setProductId(long productId) {
        this.productId = productId;
    }

    public boolean equals(Object object) {
        if (this == object) return true;
        if (object == null || getClass() != object.getClass()) return false;
        if (!super.equals(object)) return false;
        CartProductKey that = (CartProductKey) object;
        return cartId == that.cartId &&
                productId == that.productId;
    }

    public int hashCode() {
        return Objects.hash(super.hashCode(), cartId, productId);
    }
}