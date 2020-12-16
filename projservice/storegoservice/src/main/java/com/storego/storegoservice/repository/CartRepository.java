package com.storego.storegoservice.repository;

import com.storego.storegoservice.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    public Cart findByPersonNif(long nif);
}

