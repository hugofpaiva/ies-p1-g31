package com.storego.storegoservice.model;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Objects;
import java.util.Set;
import java.util.Date;

@Entity
@Data
@Table(name = "transaction")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "nif_cliente", nullable = false)
    private Person client;

    @Column(name = "date", nullable = false)
    @CreationTimestamp
    private Date date;

    @OneToMany(mappedBy="transaction", cascade = CascadeType.ALL)
    Set<TransactionProduct> products;

    public Transaction() {

    }

    public Transaction(Person client, Date date) {
        this.client = client;
        this.date = date;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Transaction that = (Transaction) o;
        return id == that.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}