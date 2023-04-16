package br.com.listit.listit.services.user;

import java.util.Optional;

import br.com.listit.listit.domain.entity.User;
import br.com.listit.listit.web.dto.UserAllFieldsDTO;
import br.com.listit.listit.web.dto.UserDTO;

public interface UserService {
	
	UserDTO createUser(UserAllFieldsDTO userDTO);
	
	UserDTO login(String username, String password);
	
	Optional<User> getUserCurrent();
	
	UserDTO getUserDTOCurrent();
	
	void desabilityViewProfile();
	
	void activeViewProfile();
	
	void updatePasswordUserCurrent(String password);
	
	void updateDesciption(String description);
	
	void updateUser(String username , UserAllFieldsDTO userDTO);
	
	void deleteUserCurrent();

}
