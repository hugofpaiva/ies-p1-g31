package com.storego.storegoservice.model;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Set;
import java.util.Date;

@Entity
@Data
@Table(name = "transaction")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne
    @JoinColumn(name = "nif_cliente", nullable = false)
    private Person client;

    @Column(name = "date", nullable = false)
    @CreationTimestamp
    private Date date;

    @OneToMany(mappedBy="transaction")
    Set<TransactionProduct> products;

    public Transaction() {

    }

    public Transaction(Person client, Date date) {
        this.client = client;
        this.date = date;
    }

}