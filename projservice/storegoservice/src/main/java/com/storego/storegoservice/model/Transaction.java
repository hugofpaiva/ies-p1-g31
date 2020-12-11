package com.storego.storegoservice.model;

import javax.persistence.*;

@Entity
@Table(name = "transaction")
public class TransactionProduct {

    private long id;
    private int nif_cliente;
    private Set<TransactionProduct> transactionproducts;

    public Cart() {}

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
    public int getNif_cliente() {
        return nif_cliente;
    }
    public void setNif_cliente(int nif_cliente) {
        this.nif_cliente = nif_cliente;
    }

    @OneToMany(mappedBy="transaction")
    public Set<TransactionProduct> getTransactionproducts() {
        return transactionproducts;
    }
    public void setTransactionproducts(Set<TransactionProduct> transactionproducts) {
        this.transactionproducts = transactionproducts;
    }
}