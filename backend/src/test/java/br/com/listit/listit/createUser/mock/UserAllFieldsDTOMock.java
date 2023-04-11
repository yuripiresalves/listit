package br.com.listit.listit.createUser.mock;

import br.com.listit.listit.web.dto.UserAllFieldsDTO;
import br.com.listit.listit.domain.entity.User;
import br.com.listit.listit.web.dto.UserDTO;

public class UserAllFieldsDTOMock {
	public static UserAllFieldsDTO getUserAllFieldsDTO() {
		return UserAllFieldsDTO.builder()
			.description("description")
			.email("yuripa@email.com")
			.name("Yuri")
			.password(null)
			.urlImage("https://github.com/yuripiresalves.png")
			.username("yuripa")
			.viewProfile(true)
			.build();
	}

	public static User getUser() {
		return User.builder()
			.description("description")
			.email("yuripa@email.com")
			.name("Yuri")
			.password(null)
			.urlImage("https://github.com/yuripiresalves.png")
			.username("yuripa")
			.viewProfile(true)
			.build();
	}
	
	public static UserDTO getUserDTO() {
		return UserDTO.builder()
			.description("description")
			.email("yuripa@email.com")
			.name("Yuri")
			.urlImage("https://github.com/yuripiresalves.png")
			.username("yuripa")
			.viewProfile(true)
			.build();
	}
}
