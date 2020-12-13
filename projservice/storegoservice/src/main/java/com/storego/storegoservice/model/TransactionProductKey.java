package com.storego.storegoservice.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
class TransactionProductKey implements Serializable {

    private long transactionId;
    private long productId;

    public TransactionProductKey() {}

    @Column(name = "transaction_id")
    public long getTransactionId() {
        return transactionId;
    }
    public void setTransactionId(long transactionId) {
        this.transactionId = transactionId;
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
        TransactionProductKey that = (TransactionProductKey) object;
        return transactionId == that.transactionId &&
                productId == that.productId;
    }

    public int hashCode() {
        return Objects.hash(super.hashCode(), transactionId, productId);
    }
}