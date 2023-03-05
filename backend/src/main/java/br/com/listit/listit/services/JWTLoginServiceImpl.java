package br.com.listit.listit.services;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Service;

import br.com.listit.listit.web.security.token.TokenUtil;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class JWTLoginServiceImpl implements JWTLoginService {
	
	private AuthenticationManager authenticationManager;
	private TokenUtil jwtTokenUtil;
	

}
