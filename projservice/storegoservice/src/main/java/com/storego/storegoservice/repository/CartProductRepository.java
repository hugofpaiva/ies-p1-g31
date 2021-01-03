package com.storego.storegoservice.repository;

import com.storego.storegoservice.model.CartProduct;
import com.storego.storegoservice.model.CartProductKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartProductRepository extends JpaRepository<CartProduct, CartProductKey> {
    public CartProduct findByCart_PersonNifAndProductId(long nif, long prod_id);
}
