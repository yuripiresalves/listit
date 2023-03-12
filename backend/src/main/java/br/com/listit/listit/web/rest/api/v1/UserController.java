package br.com.listit.listit.web.rest.api.v1;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.listit.listit.services.UserService;
import br.com.listit.listit.web.dto.UserDTO;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/users")
@Tag(name = "user", description = "manager users")
@EnableMethodSecurity(prePostEnabled = true)
@AllArgsConstructor
public class UserController {
	private UserService userService;

	@ApiResponse(responseCode = "200", description = "create a new User", content = {
			@Content(mediaType = "application/json", schema = @Schema(implementation = UserDTO.class)) })
	@PostMapping("/create")
	public ResponseEntity<?> createUser(@RequestBody UserDTO userDTO) {
		UserDTO createUser = userService.createUser(userDTO);
		return new ResponseEntity<>(createUser, HttpStatus.CREATED);
	}

	@SecurityRequirement(name = "Bearer Authentication")
	@ApiResponse(responseCode = "200", description = "get User current", content = {
			@Content(mediaType = "application/json", schema = @Schema(implementation = UserDTO.class)) })
	@GetMapping()
	public ResponseEntity<?> userCurrent() {
		UserDTO userDTOCurrent = userService.getUserDTOCurrent();
		return new ResponseEntity<>(userDTOCurrent, HttpStatus.CREATED);
	}
}
