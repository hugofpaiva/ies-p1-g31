package com.storego.storegoservice.model;

import javax.persistence.*;
import java.util.Set;
import java.util.Date;

@Entity
@Table(name = "transaction")
public class Transaction {

    private long id;
    private Person client;
    private Date date;

    // Relations
    private Set<TransactionProduct> transactionproducts;

    public Transaction() {

    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }

    @ManyToOne
    @JoinColumn(name = "nif_cliente", nullable = false)
    public Person getClient() {
        return client;
    }
    public void setClient(Person client) {
        this.client = client;
    }

    @Column(name = "date", nullable = false)
    public Date getDate() {
        return date;
    }
    public void setDate(Date date) {
        this.date = date;
    }

    @OneToMany(mappedBy="transaction")
    public Set<TransactionProduct> getTransactionproducts() {
        return transactionproducts;
    }
    public void setTransactionproducts(Set<TransactionProduct> transactionproducts) {
        this.transactionproducts = transactionproducts;
    }
}