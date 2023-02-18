package br.com.listit.listit.services;

import br.com.listit.listit.domain.dto.UserDTO;

public interface UserService {
	
	UserDTO createUser(UserDTO userDTO);
	
	UserDTO login(String username, String password);

}
