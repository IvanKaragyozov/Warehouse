package pu.bg.service.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pu.bg.models.dto.ProductDTO;
import pu.bg.models.entity.Product;
import pu.bg.repository.ProductRepository;
import pu.bg.service.ProductService;
import pu.bg.util.ValidationUtil;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ValidationUtil validationUtil;
    private final ModelMapper modelMapper;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository, ValidationUtil validationUtil, ModelMapper modelMapper) {
        this.productRepository = productRepository;
        this.validationUtil = validationUtil;
        this.modelMapper = modelMapper;
    }

    @Override
    public Product saveProduct(Product product) throws Exception {

        if (!validationUtil.isValid(product)){
            throw new Exception("Validation failed for product " + product);
        }

        return this.productRepository.save(product);
    }

    @Override
    public List<Product> findAllProducts() {
        return this.productRepository.findAll();
    }

    @Override
    public Optional<Product> findProductById(Long id) {
        return productRepository.findById(id);
    }

    @Override
    public List<Product> findProductsByBarcode(String barcode) {
        return this.productRepository.findByBarcode(barcode);
    }

    @Override
    public void deleteProduct(Long id) {
        this.productRepository.deleteById(id);
    }

    @Override
    public ProductDTO updateProduct(Long id, ProductDTO updatedProduct) throws Exception {
        Optional<Product> optionalProduct = productRepository.findById(id);

        if (!optionalProduct.isPresent()) {
            throw new EntityNotFoundException("Product not found with id: " + id);
        }

        Product product = optionalProduct.get();

        product.setProductName(updatedProduct.getProductName());
        product.setDescription(updatedProduct.getDescription());
        product.setImage(updatedProduct.getImage());
        product.setBuyPrice(updatedProduct.getBuyPrice());
        product.setSellPrice(updatedProduct.getSellPrice());
        product.setQuantity(updatedProduct.getQuantity());
        product.setCategory(updatedProduct.getCategory());
        product.setBarcode(updatedProduct.getBarcode());

        // Validate the product entity
        if (!validationUtil.isValid(product)) {
            throw new Exception("Validation failed for product " + product.getProductName());
        }

        // Save the product entity to the database
        return modelMapper.map(productRepository.save(product), ProductDTO.class);
    }
}
