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
		personRepository.save(new Person(732421123, "Isadora Loredo", "isa@ua.pt", "abc", PersonType.CLIENT));
		personRepository.save(new Person(261546474, "Maria Furtado", "furtado.maria@ua.pt", "abc", PersonType.CLIENT));
		personRepository.save(new Person(390615322, "Pedro Carreira", "pedro.carr@ua.pt", "abc", PersonType.CLIENT));
		personRepository.save(new Person(877039422, "Carlos Teixeira", "teixeira@ua.pt", "abc", PersonType.CLIENT));
		personRepository.save(new Person(335851952, "João Pedrosa", "joao.pedro@ua.pt", "abc", PersonType.CLIENT));
		personRepository.save(new Person(639918632, "Mariana Baião", "mar.b1983@ua.pt", "abc", PersonType.CLIENT));
		personRepository.save(new Person(818386478, "Carla Filipa", "carla.filipa@ua.pt", "abc", PersonType.CLIENT));
		personRepository.save(new Person(411383247, "Filomena Malato", "f.malato@ua.pt", "abc", PersonType.CLIENT));
		personRepository.save(new Person(630114163, "José Matos", "jose.m@ua.pt", "abc", PersonType.CLIENT));
		personRepository.save(new Person(111900377, "Catarina Paiva", "cata@ua.pt", "abc", PersonType.CLIENT));

	}

}
