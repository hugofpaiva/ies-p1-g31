package com.storego.storegoservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Data
@Table(name = "transaction_has_product")
public class TransactionProduct implements Serializable {

    @EmbeddedId
    @JsonIgnore
    private TransactionProductKey id;

    @ManyToOne(optional = false)
    @MapsId("transactionId")
    @JsonIgnore
    @JoinColumn(name = "transaction_id", nullable = false)
    private Transaction transaction;

    @ManyToOne(optional = false)
    @MapsId("productId")
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "units", nullable = false)
    private int units;

    public TransactionProduct() {}

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TransactionProduct that = (TransactionProduct) o;
        return id.equals(that.id) &&
                transaction.equals(that.transaction) &&
                product.equals(that.product);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, transaction, product);
    }
}