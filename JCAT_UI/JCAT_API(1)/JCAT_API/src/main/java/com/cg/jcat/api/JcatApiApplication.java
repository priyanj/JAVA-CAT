package com.cg.jcat.api;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class JcatApiApplication {
	private static final Logger logger = LoggerFactory.getLogger(JcatApiApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(JcatApiApplication.class, args);
		logger.info("--info--Application Started--");

	}

}
