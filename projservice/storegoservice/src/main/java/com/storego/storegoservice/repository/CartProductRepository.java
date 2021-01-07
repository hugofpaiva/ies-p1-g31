package com.storego.storegoservice.repository;

import com.storego.storegoservice.model.Cart;
import com.storego.storegoservice.model.CartProduct;
import com.storego.storegoservice.model.CartProductKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface CartProductRepository extends JpaRepository<CartProduct, CartProductKey> {
    public CartProduct findByCartPersonNifAndProductId(long nif, long product_id);
    public List<CartProduct> findByCartPersonNif(long nif);
    public List<CartProduct> findByCartId(long id);
}
