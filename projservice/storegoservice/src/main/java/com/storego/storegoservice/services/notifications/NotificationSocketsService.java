package com.storego.storegoservice.services.notifications;

import com.storego.storegoservice.model.MessageToClient;
import com.storego.storegoservice.model.Notification;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Service;


@Service
public class NotificationSocketsService {

    @SendTo("/topic/help")
    public MessageToClient sendHelp(Notification notification) throws Exception {
        return new MessageToClient(notification);
    }

    @SendTo("/topic/restock")
    public MessageToClient sendRestock(Notification notification) throws Exception {
        return new MessageToClient(notification);
    }

    @SendTo("/topic/store_full")
    public MessageToClient sendStoreFull(Notification notification) throws Exception {
        return new MessageToClient(notification);
    }

}
