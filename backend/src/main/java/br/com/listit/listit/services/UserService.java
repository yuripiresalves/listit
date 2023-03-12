package br.com.listit.listit.services;

import java.util.Optional;

import br.com.listit.listit.domain.entity.User;
import br.com.listit.listit.web.dto.UserDTO;

public interface UserService {
	
	UserDTO createUser(UserDTO userDTO);
	
	UserDTO login(String username, String password);
	
	Optional<User> getUserCurrent();
	
	UserDTO getUserDTOCurrent();

}
