package com.storego.storegoservice.model;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.util.Date;

@Document(collection = "Notifications")
@Data
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;

    @Enumerated(EnumType.ORDINAL)
    private NotificationType type;

    @CreationTimestamp
    private Date date;

    //Stock Notification
    private long idProduct;
    private int qty;

    //Help needed Notification
    private long nif;

    @Enumerated(EnumType.ORDINAL)
    private HelpNeededState state;

    // Constructor
    public Notification() {}

    public Notification(NotificationType type) {}


}
