package br.com.listit.listit.web.rest.api.v1;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.listit.listit.services.anime.ListAnimeEntityService;
import br.com.listit.listit.services.user.UserService;
import br.com.listit.listit.web.dto.UserAllFieldsDTO;
import br.com.listit.listit.web.dto.UserDTO;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;

@RestController
@CrossOrigin
@RequestMapping("/api/users")
@Tag(name = "user", description = "manager users")
@EnableMethodSecurity(prePostEnabled = true)
@AllArgsConstructor
public class UserController {
	private UserService userService;
	private ListAnimeEntityService listAnimeEntityService;

	@ApiResponse(responseCode = "200", description = "create a new User", content = {
			@Content(mediaType = "application/json", schema = @Schema(implementation = UserDTO.class)) })
	@PostMapping("/create")
	public ResponseEntity<?> createUser(@RequestBody UserAllFieldsDTO userDTO) {
		UserDTO createUser = userService.createUser(userDTO);
		listAnimeEntityService.createAllListFoundUserByUsername(userDTO.getUsername());
		return new ResponseEntity<>(createUser, HttpStatus.CREATED);
	}
	
	@SecurityRequirement(name = "Bearer Authentication")
	@ApiResponse(responseCode = "200", description = "update password User", content = {
			@Content(mediaType = "application/json", schema = @Schema(implementation = Void.class)) })
	@PutMapping("/password")
	public ResponseEntity<?> updatePasswordUser(@RequestBody String password) {
		userService.updatePasswordUserCurrent(password);
		return ResponseEntity.ok().build();
	}
	
	@SecurityRequirement(name = "Bearer Authentication")
	@ApiResponse(responseCode = "200", description = "update password User", content = {
			@Content(mediaType = "application/json", schema = @Schema(implementation = Void.class)) })
	@PutMapping("/all/{username}")
	public ResponseEntity<?> updateUser(@RequestBody UserAllFieldsDTO userAllFieldsDTO, @PathVariable("username") String username) {
		userService.updateUser(username, userAllFieldsDTO);
		return ResponseEntity.ok().build();
	}

	@SecurityRequirement(name = "Bearer Authentication")
	@ApiResponse(responseCode = "200", description = "get User current", content = {
			@Content(mediaType = "application/json", schema = @Schema(implementation = UserDTO.class)) })
	@GetMapping()
	public ResponseEntity<?> userCurrent() {
		UserDTO userDTOCurrent = userService.getUserDTOCurrent();
		return new ResponseEntity<>(userDTOCurrent, HttpStatus.CREATED);
	}
	
	@SecurityRequirement(name = "Bearer Authentication")
	@ApiResponse(responseCode = "200", description = "set profile view for desability", content = {
			@Content(mediaType = "application/json", schema = @Schema(implementation = Void.class)) })
	@PutMapping("/profile/view/desability")
	public ResponseEntity<?> profileViewDesability() {
		 userService.desabilityViewProfile();
		return ResponseEntity.ok().build();
	}
	
	@SecurityRequirement(name = "Bearer Authentication")
	@ApiResponse(responseCode = "200", description = "set profile view for active", content = {
			@Content(mediaType = "application/json", schema = @Schema(implementation = Void.class)) })
	@PutMapping("/profile/view/active")
	public ResponseEntity<?> profileViewActive() {
		 userService.activeViewProfile();
		return ResponseEntity.ok().build();
	}
	
	@SecurityRequirement(name = "Bearer Authentication")
	@ApiResponse(responseCode = "200", description = "set description User", content = {
			@Content(mediaType = "application/json", schema = @Schema(implementation = Void.class)) })
	@PutMapping("/description")
	public ResponseEntity<?> description(@RequestBody Description description) {
		 userService.updateDesciption(description.description);
		return ResponseEntity.ok().build();
	}
	
	@SecurityRequirement(name = "Bearer Authentication")
	@ApiResponse(responseCode = "204", description = "delete user current", content = {
			@Content(mediaType = "application/json", schema = @Schema(implementation = Void.class)) })
	@DeleteMapping()
	public ResponseEntity<?> delete() {
		 userService.deleteUserCurrent();
		return ResponseEntity.ok().build();
	}
	
	public record Description(String description) {
	} 
}
