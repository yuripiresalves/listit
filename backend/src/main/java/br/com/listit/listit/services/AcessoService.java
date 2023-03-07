package br.com.listit.listit.services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import br.com.listit.listit.web.dto.TokenJwtDTO;

public interface AcessoService extends UserDetailsService {
	void authenticate(String username, String password);

	String generateToken(UserDetails userDetails);

	TokenJwtDTO authenticateAndGenerateToken(String username, String password);
}
