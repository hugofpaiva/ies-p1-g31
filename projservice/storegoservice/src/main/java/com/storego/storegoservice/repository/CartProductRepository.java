package com.storego.storegoservice.repository;

import com.storego.storegoservice.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface CartProductRepository extends JpaRepository<CartProduct, CartProductKey> {
    CartProduct findByCartPersonNifAndProductId(long nif, long product_id);
    List<CartProduct> findByCartPersonNif(long nif);
    List<CartProduct> findByCartId(long id);
    List<CartProduct> findByProduct(Product product);

}
