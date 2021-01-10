package com.storego.storegoservice.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@Data
@Table(name = "product")
public class Product implements Serializable {

    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "price", nullable = false)
    private Double price;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "stock_current", nullable = false)
    private Integer stock_current;

    @Column(name = "stock_minimum", nullable = false)
    private Integer stock_minimum;

    @ManyToOne
    @JoinColumn(name = "category", nullable = false)
    private ProductCategory category;



    public Product() { }

    public Product(Long id, Double price, String name, String description, Integer stock_current, Integer stock_minimum, ProductCategory category) {
        this.id = id;
        this.price = price;
        this.name = name;
        this.description = description;
        this.stock_current = stock_current;
        this.stock_minimum = stock_minimum;
        this.category = category;
    }

    @Override
    public String toString() {
        return id + ": [" + price + ",\"" + name + "\", \"" + description + "\", " + stock_current + "," + stock_minimum +
                ", \"" + category.getName() +"\"]";
    }
}