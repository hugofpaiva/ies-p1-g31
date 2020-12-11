package com.storego.storegoservice.model;

import javax.persistence.*;

@Entity
@Table(name = "productCategory")
public class ProductCategory {

    private long id;
    private String name;
    private Set<Product> products;

    public ProductCategory() {

    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }

    @Column(name = "name", nullable = false)
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    @OneToMany(mappedBy="category")
    public Set<Product> getProducts() {
        return products;
    }
    public void setProducts(Set<Product> products) {
        this.products = products;
    }
}