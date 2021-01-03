package com.storego.storegoservice;

import com.storego.storegoservice.model.*;
import com.storego.storegoservice.repository.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// To populate DB
import org.springframework.boot.CommandLineRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class StoregoserviceApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(StoregoserviceApplication.class, args);
	}

	@Autowired
	private PersonRepository personRepository;

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private PasswordEncoder bcryptEncoder;

	@Autowired
	private NotificationRepository notificationRepository;

	@Autowired
	private ProductCategoryRepository productCategoryRepository;

	public void run(String... args) throws Exception {
		System.out.println("\n\n\n\nPOPULATING DATABASE.....\n\n\n\n");

		personRepository.save( new Person(732421123, "Isadora Loredo", "isa@ua.pt", bcryptEncoder.encode("abc"), PersonType.CLIENT));
		personRepository.save(new Person(261546474, "Maria Furtado", "furtado.maria@ua.pt", bcryptEncoder.encode("abc"), PersonType.CLIENT));
		personRepository.save(new Person(390615322, "Pedro Carreira", "pedro.carr@ua.pt", bcryptEncoder.encode("abc"), PersonType.CLIENT));
		personRepository.save(new Person(877039422, "Carlos Teixeira", "teixeira@ua.pt", bcryptEncoder.encode("abc"), PersonType.CLIENT));
		personRepository.save(new Person(335851952, "João Pedrosa", "joao.pedro@ua.pt", bcryptEncoder.encode("abc"), PersonType.CLIENT));
		personRepository.save(new Person(639918632, "Mariana Baião", "mar.b1983@ua.pt", bcryptEncoder.encode("abc"), PersonType.CLIENT));
		personRepository.save(new Person(818386478, "Carla Filipa", "carla.filipa@ua.pt", bcryptEncoder.encode("abc"), PersonType.CLIENT));
		personRepository.save(new Person(411383247, "Filomena Malato", "f.malato@ua.pt", bcryptEncoder.encode("abc"), PersonType.CLIENT));
		personRepository.save(new Person(630114163, "José Matos", "jose.m@ua.pt", bcryptEncoder.encode("abc"), PersonType.CLIENT));
		personRepository.save(new Person(111900377, "Catarina Paiva", "cata@ua.pt", bcryptEncoder.encode("abc"), PersonType.CLIENT));

		ProductCategory pc1 = new ProductCategory("Categoria1");
		ProductCategory pc2 = new ProductCategory("Categoria2");
		ProductCategory pc3 = new ProductCategory("Categoria3");
		ProductCategory pc4 = new ProductCategory("Categoria4");
		ProductCategory pc5 = new ProductCategory("Categoria5");

		productCategoryRepository.save(pc1);
		productCategoryRepository.save(pc2);
		productCategoryRepository.save(pc3);
		productCategoryRepository.save(pc4);
		productCategoryRepository.save(pc5);

		productRepository.save(new Product(1402, 10.00, "Produto1", "Descrição", 100, 5,pc1));
		productRepository.save(new Product(3719, 10.00, "Produto2", "Descrição", 288, 5,pc1));
		productRepository.save(new Product(3867, 10.00, "Produto3", "Descrição", 49, 5,pc1));
		productRepository.save(new Product(1716, 10.00, "Produto4", "Descrição", 353, 5,pc1));
		productRepository.save(new Product(2621, 10.00, "Produto5", "Descrição", 943, 5,pc2));
		productRepository.save(new Product(1539, 10.00, "Produto6", "Descrição", 334, 5,pc3));
		productRepository.save(new Product(4245, 10.00, "Produto7", "Descrição", 400, 5,pc3));
		productRepository.save(new Product(5364, 10.00, "Produto8", "Descrição", 23, 5,pc4));
		productRepository.save(new Product(1170, 10.00, "Produto9", "Descrição", 340, 5,pc4));
		productRepository.save(new Product(5192, 10.00, "Produto10", "Descrição", 120, 5,pc5));


	}

}
