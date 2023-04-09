package sen.securityservice.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sen.securityservice.model.Product;
import sen.securityservice.repository.ProductRepository;

import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {
    private ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('SCOPE_USER')")
    public List<Product> getAll() {
        if (this.productRepository.findAll().size() == 0) {
            for (int i = 0; i < 10; i++) {
                this.productRepository.save(new Product("Computer_" + i, 895.99f, "Notice_"+i));
                this.productRepository.save(new Product("Printer_" + i, 245.28f, "Notice_"+i));
                this.productRepository.save(new Product("Screen_" + i, 765.23f, "Notice_"+i));
            }
        }
        return this.productRepository.findAll();
    }

    @PostMapping("add")
    @PreAuthorize("hasAuthority('SCOPE_USER')")
    public String add(@RequestBody Product product) {
        this.productRepository.save(product);
        return "Product saved";
    }

    @PutMapping("update")
    @PreAuthorize("hasAuthority('SCOPE_USER')")
    public String update(@RequestBody Product product){
       if(this.productRepository.findById(product.getId()).isPresent()){
           Product p= Product.builder()
                   .id(product.getId())
                   .name(product.getName())
                   .price(product.getPrice())
                   .notice(product.getNotice())
                   .build();
           this.productRepository.save(p);
           return "Product modified";
       }
        return "Error";
    }

    @DeleteMapping("delete/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public String delete(@PathVariable(name = "id") Long id) {
        this.productRepository.delete(this.productRepository.findById(id).get());
        return "Product deleted";
    }
}
