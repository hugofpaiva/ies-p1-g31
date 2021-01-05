package com.storego.storegoservice.model;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.io.Serializable;
import java.util.Date;

@Document(collection = "Notifications")
@Data
public class Notification implements Serializable {

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

    // Constructor for 'Help Needed' notification
    public Notification(long nif, NotificationType type){
        this.nif = nif;
        this.type = type;
        this.state = HelpNeededState.PENDING;
    }

    // Constructor for 'Restock' notification
    public Notification(long idProduct, int qty, NotificationType type){
        this.idProduct = idProduct;
        this.qty = qty;
        this.type = type;

    }

    // Constructor for 'Store Full' notification
    public Notification(NotificationType type){
        this.type = type;
    }

    @Override
    public String toString() {
        if (type.toString() == "HELP") {
            return "Notification{" +
                    "id='" + id + '\'' +
                    ", type=" + type +
                    ", date=" + date +
                    ", nif=" + nif +
                    ", state=" + state +
                    '}';
        }
        else {
            return "Notification{" +
                    "id='" + id + '\'' +
                    ", type=" + type +
                    ", date=" + date  +
                    '}';
        }
    }
}
