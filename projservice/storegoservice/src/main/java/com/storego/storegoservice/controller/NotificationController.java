package com.storego.storegoservice.controller;


import com.storego.storegoservice.exception.ResourceNotFoundException;
import com.storego.storegoservice.model.HelpNeededState;
import com.storego.storegoservice.model.Notification;
import com.storego.storegoservice.model.NotificationType;
import com.storego.storegoservice.repository.NotificationRepository;
import com.storego.storegoservice.services.DataGeneratorComService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class NotificationController {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private DataGeneratorComService dataGeneratorComService;

    @GetMapping("/work/notifications_help")
    public ResponseEntity<Map<String, Object>> getHelpNotifications(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size){
        try {
            List<Notification> notifications = new ArrayList<>();
            Pageable paging = PageRequest.of(page, size);

            Page<Notification> pageNots;

            pageNots = notificationRepository.findAllByTypeOrderByDateDesc(NotificationType.HELP, paging);

            notifications = pageNots.getContent();


            Map<String, Object> response = new HashMap<>();
            response.put("notifications", notifications);
            response.put("currentPage", pageNots.getNumber());
            response.put("totalItems", pageNots.getTotalElements());
            response.put("totalPages", pageNots.getTotalPages());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/work/notifications_help_waiting")
    public ResponseEntity<Map<String, Object>> getHelpWaitingNotifications(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size){
        try {
            List<Notification> notifications = new ArrayList<>();
            Pageable paging = PageRequest.of(page, size);

            Page<Notification> pageNots;

            pageNots = notificationRepository.findAllByTypeAndStateOrderByDateDesc(NotificationType.HELP, HelpNeededState.PENDING, paging);

            notifications = pageNots.getContent();


            Map<String, Object> response = new HashMap<>();
            response.put("notifications", notifications);
            response.put("currentPage", pageNots.getNumber());
            response.put("totalItems", pageNots.getTotalElements());
            response.put("totalPages", pageNots.getTotalPages());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/admin/notifications_entered_left")
    public ResponseEntity<Map<String, Object>> getEnteredExitedNotifications(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size){
        try {
            List<Notification> notifications = new ArrayList<>();
            Pageable paging = PageRequest.of(page, size);

            Page<Notification> pageNots;

            pageNots = notificationRepository.findAllByTypeOrTypeOrderByDateDesc(NotificationType.ENTERED_STORE, NotificationType.EXITED_STORE, paging);

            notifications = pageNots.getContent();


            Map<String, Object> response = new HashMap<>();
            response.put("notifications", notifications);
            response.put("currentPage", pageNots.getNumber());
            response.put("totalItems", pageNots.getTotalElements());
            response.put("totalPages", pageNots.getTotalPages());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/admin/notifications_full_store")
    public ResponseEntity<Map<String, Object>> getFullStoreNotifications(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size){
        try {
            List<Notification> notifications = new ArrayList<>();
            Pageable paging = PageRequest.of(page, size);

            Page<Notification> pageNots;

            pageNots = notificationRepository.findAllByTypeOrderByDateDesc(NotificationType.STORE_FULL,paging);

            notifications = pageNots.getContent();


            Map<String, Object> response = new HashMap<>();
            response.put("notifications", notifications);
            response.put("currentPage", pageNots.getNumber());
            response.put("totalItems", pageNots.getTotalElements());
            response.put("totalPages", pageNots.getTotalPages());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/admin/notifications_restock")
    public ResponseEntity<Map<String, Object>> getRestockNotifications(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size){
        try {
            List<Notification> notifications = new ArrayList<>();
            Pageable paging = PageRequest.of(page, size);

            Page<Notification> pageNots;

            pageNots = notificationRepository.findAllByTypeOrderByDateDesc(NotificationType.RESTOCK,paging);

            notifications = pageNots.getContent();

            Map<String, Object> response = new HashMap<>();
            response.put("notifications", notifications);
            response.put("currentPage", pageNots.getNumber());
            response.put("totalItems", pageNots.getTotalElements());
            response.put("totalPages", pageNots.getTotalPages());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    //Use for edit state of help notifications
    @PutMapping("/work/notifications_help/{id}")
    public ResponseEntity<Notification> updateHelpNotification(@PathVariable(value = "id") String notificationId,
                                                 @Valid @RequestBody Notification notificationDetails) throws ResourceNotFoundException {

        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found for this id: " + notificationId));

        Notification updatedNot = notification;
        if (notificationDetails.getState() != null && notification.getType() == NotificationType.HELP) {
            notification.setState(notificationDetails.getState());

            updatedNot = notificationRepository.save(notification);
            if(notificationDetails.getState() == HelpNeededState.RESOLVED){
                dataGeneratorComService.helpGiven(notification.getNif());
            }
        }

        return ResponseEntity.ok(updatedNot);
    }


}
