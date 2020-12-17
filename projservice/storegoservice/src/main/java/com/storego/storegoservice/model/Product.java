package com.storego.storegoservice.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Entity
@Data
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "price", nullable = false)
    private double price;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "stock_current", nullable = false)
    private int stock_current;

    @Column(name = "stock_minimum", nullable = false)
    private int stock_minimum;

    @ManyToOne
    @JoinColumn(name = "category", nullable = false)
    private ProductCategory category;



    public Product() { }

    public Product(double price, String name, String description, int stock_current, int stock_minimum, ProductCategory category) {
        this.price = price;
        this.name = name;
        this.description = description;
        this.stock_current = stock_current;
        this.stock_minimum = stock_minimum;
        this.category = category;
    }

}