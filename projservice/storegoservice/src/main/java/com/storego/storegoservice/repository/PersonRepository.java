package com.storego.storegoservice.repository;

import com.storego.storegoservice.model.Person;
import com.storego.storegoservice.model.PersonType;
import com.storego.storegoservice.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
    Integer countByEmail(String email);
    Person findByNif(Long nif);
    Optional<Person> findByEmail(String email);
    Set<Person> findDistinctTop10ByLastVisitIsNotNullOrderByLastVisitDesc();
    List<Person> findAllByType(PersonType type);
    Page<Person> findAllByType(PersonType type, Pageable pageable);
    Page<Person> findAllByTypeAndNameContaining(PersonType type, String name, Pageable pageable);
}
