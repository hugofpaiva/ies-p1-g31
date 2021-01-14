package com.storego.storegoservice.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@Data
@Table(name = "productCategory")
public class ProductCategory implements Serializable {

    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name", nullable = false)
    private String name;

    public ProductCategory() {

    }

    public ProductCategory(long id, String name) {
        this.id=id;
        this.name = name;
    }

}