package com.storego.storegoservice.repository;

import com.storego.storegoservice.model.Person;
import com.storego.storegoservice.model.PersonType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
    public Integer countByEmail(String email);
    public Person findByNif(Long nif);
    public Person findByEmail(String email);
    public Set<Person> findDistinctTop10ByLastVisitIsNotNullOrderByLastVisitDesc();
    public List<Person> findAllByType(PersonType type);
}
