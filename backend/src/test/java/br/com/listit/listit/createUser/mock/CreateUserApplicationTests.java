package br.com.listit.listit.createUser.mock;

import static org.mockito.Mockito.when;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import br.com.listit.listit.domain.entity.User;
import br.com.listit.listit.repository.UserRepository;
import br.com.listit.listit.services.user.UserServiceImpl;
import br.com.listit.listit.web.dto.UserAllFieldsDTO;

@DisplayName("test createUser")
@ExtendWith(SpringExtension.class)
class CreateUserApplicationTests {

	@Mock
	private UserRepository userRepository;

	@Mock
	private PasswordEncoder passwordEncoder;

	@Test
	void when_passwordIsNotNullSuccessfull() {
		UserAllFieldsDTO userAllFieldsDTO = UserAllFieldsDTOMock.getUserAllFieldsDTO();
		userAllFieldsDTO.setPassword("passsword");

		User user = UserAllFieldsDTOMock.getUser();

		when(userRepository.save(user)).thenReturn(user);

		UserServiceImpl userService = new UserServiceImpl();
		userService.setUserRepository(userRepository);
		userService.setPasswordEncoder(passwordEncoder);

		Assertions.assertThat(userService.createUser(userAllFieldsDTO))
				.isEqualTo(UserAllFieldsDTOMock.getUserDTO());

	}

	@Test
	void when_passwordIsNullSuccessfull() {
		UserAllFieldsDTO userAllFieldsDTO = UserAllFieldsDTOMock.getUserAllFieldsDTO();
		userAllFieldsDTO.setPassword(null);

		User user = UserAllFieldsDTOMock.getUser();

		when(userRepository.save(user)).thenReturn(user);

		UserServiceImpl userService = new UserServiceImpl();
		userService.setUserRepository(userRepository);

		Assertions.assertThat(userService.createUser(userAllFieldsDTO))
				.isEqualTo(UserAllFieldsDTOMock.getUserDTO());

	}

}
