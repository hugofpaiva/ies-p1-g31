package com.storego.storegoservice.model;

import javax.persistence.*;

@Entity
@Table(name = "product")
public class Product {

    private long id;
    private double price;
    private String name;
    private String description;
    private int stock_current;
    private int stock_minimum;
    private ProductCategory category;


    public Product() {

    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }

    @Column(name = "price", nullable = false)
    public double getPrice() {
        return price;
    }
    public void setPrice(double price) {
        this.price = price;
    }

    @Column(name = "name", nullable = false)
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    @Column(name = "description", nullable = false)
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    @Column(name = "stock_current", nullable = false)
    public int getStock_current() {
        return stock_current;
    }
    public void setStock_current(int stock_current) {
        this.stock_current = stock_current;
    }

    @Column(name = "stock_minimum", nullable = false)
    public int getStock_minimum() {
        return stock_minimum;
    }
    public void setStock_minimum(int stock_minimum) {
        this.stock_minimum = stock_minimum;
    }

    @ManyToOne
    @JoinColumn(name = "category", nullable = false)
    public ProductCategory getCategory() {
        return category;
    }
    public void setCategory(ProductCategory category) {
        this.category = category;
    }
}