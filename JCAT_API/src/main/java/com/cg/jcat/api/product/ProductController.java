package com.cg.jcat.api.product;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:5000")
@RestController
@RequestMapping("/")
public class ProductController {
	
	@Autowired
	IProductRepository productRepository;
	
	@GetMapping("/product/read.php")
	List<Products> findAllProducts(){
		return productRepository.findAll();
	}

}
