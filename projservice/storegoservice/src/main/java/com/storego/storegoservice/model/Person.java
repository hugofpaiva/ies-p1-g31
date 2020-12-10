package com.storego.storegoservice.model;

import javax.persistence.*;

@Entity
@Table(name = "person")
public class Person {

    // Attributes
    private int nif;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private PersonType type;

    // Relations
    private Cart cart;
    private Set<Transaction> transactions;

    // Constructors
    public Person(){
    }

    public Person(String firstName, String lastName, String email){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    // Getters and setters
    @Id
    @Column(name = "nif", nullable = false)
    public int getNif() {
        return nif;
    }
    public void setNif(int nif) {
        this.nif = nif;
    }


    @Column(name = "first_name", nullable = false)
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @Column(name = "last_name", nullable = false)
    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Column(name = "email", nullable = false)
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    @Column(name = "password", nullable = false)
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    @Column(name = "type", nullable = false)
    public PersonType getType() {
        return type;
    }
    public void setType(PersonType type) {
        this.type = type;
    }

    @OneToOne(mappedBy = "nif_cliente", cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    public Cart getCart() {
        return cart;
    }
    public void setCart(Cart cart) {
        this.cart = cart;
    }

    @OneToMany(mappedBy="nif_cliente", cascade = CascadeType.ALL)
    public Set<Transaction> getTransactions() {
        return transactions;
    }
    public void setTransactions(Set<Transaction> transactions) {
        this.transactions = transactions;
    }
}
