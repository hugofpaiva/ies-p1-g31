package com.storego.storegoservice.repository;

import com.storego.storegoservice.model.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends MongoRepository<Notification, String> {
    public Notification findByType(Integer type);

}
