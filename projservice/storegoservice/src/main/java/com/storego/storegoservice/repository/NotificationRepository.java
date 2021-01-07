package com.storego.storegoservice.repository;

import com.storego.storegoservice.model.HelpNeededState;
import com.storego.storegoservice.model.Notification;
import com.storego.storegoservice.model.NotificationType;
import com.storego.storegoservice.model.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends MongoRepository<Notification, String> {
    Page<Notification> findAllByTypeOrderByDateDesc(NotificationType type, Pageable pageable);
    Page<Notification> findAllByTypeAndStateOrderByDateDesc(NotificationType type, HelpNeededState state, Pageable pageable);
    Page<Notification> findAllByTypeAndTypeOrderByDateDesc(NotificationType type1,NotificationType type2, Pageable pageable);

}
