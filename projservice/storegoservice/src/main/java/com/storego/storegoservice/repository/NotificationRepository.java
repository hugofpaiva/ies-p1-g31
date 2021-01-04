package com.storego.storegoservice.repository;

import com.storego.storegoservice.model.HelpNeededState;
import com.storego.storegoservice.model.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends MongoRepository<Notification, String> {
    public List<Notification> findByTypeAndAndState(Integer type, HelpNeededState state);
    public List<Notification> findByNif(long nif);

}
