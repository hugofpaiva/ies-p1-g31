package com.storego.storegoservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// To populate DB
import org.springframework.boot.CommandLineRunner;
import com.storego.storegoservice.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import com.storego.storegoservice.model.Person;
import com.storego.storegoservice.model.PersonType;

@SpringBootApplication
public class StoregoserviceApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(StoregoserviceApplication.class, args);
	}

	@Autowired
	private PersonRepository personRepository;

	public void run(String... args) throws Exception {
		System.out.println("\n\n\n\nPOPULATING DATABASE.....\n\n\n\n");
		personRepository.save(new Person(732421123, "Isadora", "Loredo", "isa@ua.pt", "abc", PersonType.CLIENT));
		personRepository.save(new Person(261546474, "Isadora", "Loredo", "isa@ua.pt", "abc", PersonType.CLIENT));
		personRepository.save(new Person(390615322, "Isadora", "Loredo", "isa@ua.pt", "abc", PersonType.CLIENT));
		personRepository.save(new Person(877039422, "Isadora", "Loredo", "isa@ua.pt", "abc", PersonType.CLIENT));
		personRepository.save(new Person(335851952, "Isadora", "Loredo", "isa@ua.pt", "abc", PersonType.CLIENT));
		personRepository.save(new Person(639918632, "Isadora", "Loredo", "isa@ua.pt", "abc", PersonType.CLIENT));
		personRepository.save(new Person(818386478, "Isadora", "Loredo", "isa@ua.pt", "abc", PersonType.CLIENT));
		personRepository.save(new Person(411383247, "Isadora", "Loredo", "isa@ua.pt", "abc", PersonType.CLIENT));
		personRepository.save(new Person(630114163, "Isadora", "Loredo", "isa@ua.pt", "abc", PersonType.CLIENT));
		personRepository.save(new Person(111900377, "Isadora", "Loredo", "isa@ua.pt", "abc", PersonType.CLIENT));
	}

}
