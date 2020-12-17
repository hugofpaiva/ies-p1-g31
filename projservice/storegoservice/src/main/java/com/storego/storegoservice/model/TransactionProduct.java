package com.storego.storegoservice.model;

import lombok.Data;

import javax.persistence.*;

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

}