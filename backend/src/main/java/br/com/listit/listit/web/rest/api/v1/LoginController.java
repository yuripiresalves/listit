package br.com.listit.listit.web.rest.api.v1;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.listit.listit.services.AcessoService;
import br.com.listit.listit.web.dto.TokenJwtDTO;
import br.com.listit.listit.web.dto.UserDTO;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;

@RestController
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

	public record Login(String username, String password) {
	}

}
