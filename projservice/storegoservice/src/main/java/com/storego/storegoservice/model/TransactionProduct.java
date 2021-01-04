package com.storego.storegoservice.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Data
@Table(name = "transaction_has_product")
public class TransactionProduct {

    @EmbeddedId
    private TransactionProductKey id;

    @ManyToOne
    @MapsId("transactionId")
    @JoinColumn(name = "transaction_id")
    private Transaction transaction;

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "product_id")
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