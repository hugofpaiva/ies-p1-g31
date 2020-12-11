package com.storego.storegoservice.model;

import javax.persistence.*;

@Entity
@Table(name = "transaction_has_product")
public class TransactionProduct {

    private TransactionProductKey id;
    private Transaction transaction;
    private Product product;
    private int units;

    public TransactionProduct() {}

    @EmbeddedId
    public TransactionProductKey getId() {
        return id;
    }
    public void setId(TransactionProductKey id) {
        this.id = id;
    }

    @ManyToOne
    @MapsId("transactionId")
    @JoinColumn(name = "transaction_id")
    public Transaction getTransaction() {
        return transaction;
    }
    public void setTransaction(Transaction transaction) {
        this.transaction = transaction;
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