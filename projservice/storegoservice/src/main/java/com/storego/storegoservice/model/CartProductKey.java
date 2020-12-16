package com.storego.storegoservice.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Data
class CartProductKey implements Serializable {

    @Column(name = "cart_id")
    private int cartId;

    @Column(name = "product_id")
    private long productId;

    public CartProductKey() {}

}