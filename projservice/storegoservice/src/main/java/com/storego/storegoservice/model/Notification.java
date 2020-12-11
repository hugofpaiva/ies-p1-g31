package com.storego.storegoservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "Notifications")
public class Notification {

    @Id
    private String id;

    private Integer type;
    private Date date;

    //Stock Notification
    private long idProduct;

    //Help needed Notification
    private long nifClient;
    private Integer state;

    public Notification() {}

    public Notification(Integer type, Date date) {
        this.type = type;
        this.date = date;
    }

    //Stock Notification
    public Notification(Integer type, long idProduct) {
        this.type = type;
        this.date = new Date();;
        this.idProduct = idProduct;
    }

    //Help needed Notification
    public Notification(Integer type, long nifClient, Integer state) {
        this.type = type;
        this.date = new Date();;
        this.nifClient = nifClient;
        this.state = state;
    }



}
