package com.storego.storegoservice.repository;

import com.storego.storegoservice.model.CartProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartProductRepository extends JpaRepository<CartProduct, Long> {
    public CartProduct findByCartIdAndProductId(long cart_id, Long prod_id);
}
