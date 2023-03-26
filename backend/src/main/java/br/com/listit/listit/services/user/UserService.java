package br.com.listit.listit.services.user;

import java.util.Optional;

import br.com.listit.listit.domain.entity.User;
import br.com.listit.listit.web.dto.CreatedUserDTO;
import br.com.listit.listit.web.dto.UserDTO;

public interface UserService {
	
	UserDTO createUser(CreatedUserDTO userDTO);
	
	UserDTO login(String username, String password);
	
	Optional<User> getUserCurrent();
	
	UserDTO getUserDTOCurrent();
	
	void desabilityViewProfile();
	
	void activeViewProfile();
	
	void updatePasswordUserCurrent(String password);
	
	void updateDesciption(String description);

}
