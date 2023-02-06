package br.com.listit.listit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import br.com.listit.listit.services.remote.jikan.JikanSimpleFactory;

@SpringBootApplication
public class ListitApplication {

	public static void main(String[] args) {
		SpringApplication.run(ListitApplication.class, args);	
		JikanSimpleFactory.initialzrService();
	}
}
