package com.storego.storegoservice;

import com.storego.storegoservice.model.*;
import com.storego.storegoservice.repository.*;
import com.storego.storegoservice.services.notifications.NotificationSocketsService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// To populate DB
import org.springframework.boot.CommandLineRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class StoregoserviceApplication{

	public static void main(String[] args) {
		SpringApplication.run(StoregoserviceApplication.class, args);
	}

}
