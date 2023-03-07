package br.com.listit.listit.services;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.listit.listit.domain.entity.User;
import br.com.listit.listit.exception.UserNotFoundException;
import br.com.listit.listit.repository.UserRepository;
import br.com.listit.listit.web.dto.UserDTO;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

	private UserRepository userRepository;
	private PasswordEncoder passwordEncoder;

	@Override
	public UserDTO createUser(UserDTO userDTO) {
		User convertUSerDtoToUserEntity = convertUSerDtoToUserEntity(userDTO);

		convertUSerDtoToUserEntity.setPassword(passwordEncoder.encode(convertUSerDtoToUserEntity.getPassword()));
		
		User user = userRepository.save(convertUSerDtoToUserEntity);
		return convertUserEntityToUSerDto(user);
	}

	@Override
	public UserDTO login(String username, String password) {
		
		Optional<User> findByUsernameAndPassword = userRepository.findByUsernameAndPassword(username, password);
		User user = findByUsernameAndPassword.orElseThrow(()->{
			throw new UserNotFoundException("username or password are incorrect");
		});
		return convertUserEntityToUSerDto(user);

	}

	private User convertUSerDtoToUserEntity(UserDTO dto) {
		return User.builder().email(dto.getEmail()).name(dto.getName()).password(dto.getPassword())
				.username(dto.getUsername()).build();
	}

	private UserDTO convertUserEntityToUSerDto(User user) {
		return UserDTO.builder().email(user.getEmail()).name(user.getName()).username(user.getUsername()).build();
	}

}
