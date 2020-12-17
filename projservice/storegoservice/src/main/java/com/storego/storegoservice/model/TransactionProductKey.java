package com.storego.storegoservice.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Data
class TransactionProductKey implements Serializable {

    @Column(name = "transaction_id")
    private long transactionId;

    @Column(name = "product_id")
    private long productId;

    public TransactionProductKey() {}

}