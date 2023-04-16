package br.com.listit.listit.services.user;

import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.listit.listit.domain.entity.User;
import br.com.listit.listit.exception.UserNotFoundException;
import br.com.listit.listit.repository.UserRepository;
import br.com.listit.listit.web.dto.UserAllFieldsDTO;
import br.com.listit.listit.web.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Service
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserServiceImpl implements UserService {

	private UserRepository userRepository;
	private PasswordEncoder passwordEncoder;

	@Override
	public UserDTO createUser(UserAllFieldsDTO userDTO) {
		User convertUSerDtoToUserEntity = convertUserDtoToUserEntity(userDTO);
		String password = convertUSerDtoToUserEntity.getPassword();
		
		if(password != null) {
			convertUSerDtoToUserEntity.setPassword(passwordEncoder.encode(password));
		}

		User user = userRepository.save(convertUSerDtoToUserEntity);
		return convertUserEntityToUSerDto(user);
	}

	@Override
	public UserDTO login(String username, String password) {

		Optional<User> findByUsernameAndPassword = userRepository.findByUsernameAndPassword(username, password);
		User user = findByUsernameAndPassword.orElseThrow(() -> {
			throw new UserNotFoundException("username or password are incorrect");
		});
		return convertUserEntityToUSerDto(user);

	}
	
	@Override
	public void desabilityViewProfile() {
		Optional<User> userCurrent = getUserCurrent();
		User user = extratUserOrThrowException(userCurrent);
		
		user.setViewProfile(false);
		
		userRepository.save(user);
	}

	@Override
	public void activeViewProfile() {
		Optional<User> userCurrent = getUserCurrent();
		User user = extratUserOrThrowException(userCurrent);
		
		user.setViewProfile(true);
		
		userRepository.save(user);
	}
	
	@Override
	public void updatePasswordUserCurrent(String password) {
		Optional<User> userCurrent = getUserCurrent();
		User user = extratUserOrThrowException(userCurrent);
		
		user.setPassword(passwordEncoder.encode(password));
		
		userRepository.save(user);
	}
	
	@Override
	public void updateDesciption(String description) {
		Optional<User> userCurrent = getUserCurrent();
		User user = extratUserOrThrowException(userCurrent);
		
		user.setDescription(description);
		
		userRepository.save(user);
	}
	
	@Override
	public void updateUser(String username, UserAllFieldsDTO userDTO) {
		Optional<User> userFounded = userRepository.findByUsername(username);
		User user = extratUserOrThrowException(userFounded);
		
		User userToUpdated = convertUserDtoToUserEntity(userDTO);
		
		userToUpdated.setId(user.getId());
		
		userRepository.save(userToUpdated);
	}
	
	private User extratUserOrThrowException(Optional<User> userCurrent) {
		return userCurrent.orElseThrow(()->{
			throw new UserNotFoundException("User not found");
		});
		
	}

	@Override
	public Optional<User> getUserCurrent() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		UserDetails userDetails;
		
		try {
			userDetails = (UserDetails) auth.getPrincipal();
		} catch (Exception e) {
			throw new UserNotFoundException("User not found");
		}
		return userRepository.findByUsername(userDetails.getUsername());
	}

	private User convertUserDtoToUserEntity(UserAllFieldsDTO dto) {
		return User.builder().email(dto.getEmail()).name(dto.getName()).viewProfile(dto.isViewProfile()).password(dto.getPassword())
				.username(dto.getUsername()).description(dto.getDescription()).urlImage(dto.getUrlImage()).build();
	}

	private UserDTO convertUserEntityToUSerDto(User user) {
		return UserDTO.builder().email(user.getEmail()).name(user.getName()).viewProfile(user.isViewProfile()).urlImage(user.getUrlImage()).description(user.getDescription()).username(user.getUsername()).build();
	}

	@Override
	public UserDTO getUserDTOCurrent() {
		User user = getUserCurrent().orElseThrow(() -> new UserNotFoundException("User not found"));
		return convertUserEntityToUSerDto(user);
	}

	@Override
	public void deleteUserCurrent() {
		User user = getUserCurrent().orElseThrow(() -> new UserNotFoundException("User not found"));
		
		userRepository.deleteById(user.getId());
	}
}
