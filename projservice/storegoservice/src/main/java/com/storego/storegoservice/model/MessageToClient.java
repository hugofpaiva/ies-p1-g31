package com.storego.storegoservice.model;

import lombok.Data;

@Data
public class MessageToClient {
    private Notification notification;

    public MessageToClient(Notification notification) {
        this.notification = notification;
    }
}
