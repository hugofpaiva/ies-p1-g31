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
public class StoregoserviceApplication implements CommandLineRunner{

	public static void main(String[] args) {
		SpringApplication.run(StoregoserviceApplication.class, args);
	}

	@Autowired
	private PersonRepository personRepository;

	@Autowired
	private PasswordEncoder bcryptEncoder;

	public void run(String... args) throws Exception {
		System.out.println("\n\n\n\nPOPULATING DATABASE.....\n\n\n\n");
		personRepository.save(new Person(894552452, "Amélia Rodrigues", "amelia.rodrigues@gostore.com", bcryptEncoder.encode("abc"), PersonType.MANAGER));
		personRepository.save(new Person(894552453, "Pedro Paulo", "pedro.paulo@gostore.com", bcryptEncoder.encode("abc"), PersonType.EMPLOYEE));



	}

}
