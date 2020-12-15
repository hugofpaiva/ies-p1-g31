package com.storego.storegoservice.model;

import javax.persistence.*;
import java.util.Set;
import java.util.Objects;

@Entity // This tells Hibernate to make a table out of this class
@Table(name = "person")
public class Person {

    // Attributes
    private long nif;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private PersonType type;

    // Relations
    private Cart cart;

    // Constructors
    public Person() {
    }

    public Person(long nif, String firstName, String lastName, String email, String password, PersonType type) {
        this.nif = nif;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.type = type;
    }

    // Getters and setters
    @Id
    @Column(name = "nif", nullable = false)
    public long getNif() {
        return nif;
    }
    public void setNif(long nif) {
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
    @Enumerated(EnumType.ORDINAL)
    public PersonType getType() {
        return type;
    }
    public void setType(PersonType type) {
        this.type = type;
    }

    @OneToOne(mappedBy = "client", cascade = CascadeType.ALL)
    public Cart getCart() {
        return cart;
    }
    public void setCart(Cart cart) {
        this.cart = cart;
    }

    @Override
    public String toString() {
        return "Person{" +
                "nif='" + nif + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object object) {
        System.out.println("equals()");
        System.out.println(this.toString());
        System.out.println(getClass());
        System.out.println(object);
        System.out.println(object.getClass());
        if (this == object) return true;
        if (object == null || getClass() != object.getClass()) return false;
        if (!super.equals(object)) return false;
        Person person = (Person) object;
        return nif == person.getNif();
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), nif);
    }
}