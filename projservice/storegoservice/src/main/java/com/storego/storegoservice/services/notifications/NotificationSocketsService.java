package com.storego.storegoservice.services.notifications;

import com.storego.storegoservice.model.MessageFromClient;
import com.storego.storegoservice.model.MessageToClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
public class NotificationSocketsService {
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/secured/room")
    public void sendSpecific(
            @Payload MessageFromClient msg,
            Principal user,
            @Header("simpSessionId") String sessionId) throws Exception {
        MessageToClient out = new MessageToClient(
                msg.getFrom(),
                msg.getText());
        simpMessagingTemplate.convertAndSendToUser(
                msg.getTo(), "user/queue/specific-user", out);
    }
}
