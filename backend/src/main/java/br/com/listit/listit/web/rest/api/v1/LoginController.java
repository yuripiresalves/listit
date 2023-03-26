package br.com.listit.listit.web.rest.api.v1;

import java.io.IOException;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.listit.listit.services.user.AcessoService;
import br.com.listit.listit.web.dto.TokenJwtDTO;
import br.com.listit.listit.web.dto.UserDTO;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;

@RestController
@CrossOrigin
@RequestMapping("/api/authenticate")
@Tag(name = "login", description = "login users")
@AllArgsConstructor	
public class LoginController {
	private AcessoService acessoService;

	@ApiResponse(responseCode = "200", description = "login", content = {
			@Content(mediaType = "application/json", schema = @Schema(implementation = UserDTO.class)) })
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody Login login) {
		TokenJwtDTO authenticateAndGenerateToken = acessoService.authenticateAndGenerateToken(login.username,
				login.password);
		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders.set("token", authenticateAndGenerateToken.getToken());

		ResponseEntity<TokenJwtDTO> response = new ResponseEntity<>(authenticateAndGenerateToken, responseHeaders,
				HttpStatus.OK);

		return response;
	}

	@ApiResponse(responseCode = "200", description = "login", content = {
			@Content(mediaType = "application/json", schema = @Schema(implementation = UserDTO.class)) })
	@PostMapping("/login/google")
	public ResponseEntity<?> loginGoogle(@RequestBody Credential credential) throws IOException {
		TokenJwtDTO tokenGenerated = acessoService.authenticateGoogle(credential.token());
		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders.set("token", tokenGenerated.getToken());

		ResponseEntity<TokenJwtDTO> response = new ResponseEntity<>(tokenGenerated, responseHeaders,
				HttpStatus.OK);
		return response;
	}

	
	public record Login(String username, String password) {
	}
	
	public record Credential(String token) {
	}

}
