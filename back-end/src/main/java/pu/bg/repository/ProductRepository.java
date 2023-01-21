package pu.bg.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pu.bg.models.entity.Product;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByBarcode(String barcode);

}
