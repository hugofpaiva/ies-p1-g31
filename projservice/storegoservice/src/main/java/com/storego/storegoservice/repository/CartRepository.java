package com.storego.storegoservice.repository;

import com.storego.storegoservice.model.Cart;
import com.storego.storegoservice.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    public Cart findByPersonNif(long nif);

    @Query("SELECT DISTINCT a.person FROM Cart a")
    Set<Person> findDistinctPerson();

    @Query("SELECT COUNT(DISTINCT a.person) FROM Cart a")
    Integer countDistinctPerson();
}

