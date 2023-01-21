package pu.bg.service;

import org.springframework.stereotype.Service;
import pu.bg.models.dto.ProductDTO;
import pu.bg.models.entity.Product;

import java.util.List;
import java.util.Optional;

@Service
public interface ProductService {

    Product saveProduct(Product product) throws Exception;

    List<Product> findAllProducts();

    Optional<Product> findProductById(Long id);

    List<Product> findProductsByBarcode(String barcode);

    void deleteProduct(Long id);

    ProductDTO updateProduct(Long id, ProductDTO updatedProduct) throws Exception;
}
