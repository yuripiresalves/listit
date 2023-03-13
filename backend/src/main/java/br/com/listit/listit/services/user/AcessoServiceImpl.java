package br.com.listit.listit.services.user;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.com.listit.listit.domain.entity.AcessoUser;
import br.com.listit.listit.domain.entity.User;
import br.com.listit.listit.exception.BadCredentialsCustomException;
import br.com.listit.listit.exception.UserDisabledException;
import br.com.listit.listit.services.user.security.UserDetailsServiceImpl;
import br.com.listit.listit.web.dto.TokenJwtDTO;
import br.com.listit.listit.web.dto.UserDTO;
import br.com.listit.listit.web.security.token.TokenUtil;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AcessoServiceImpl implements AcessoService {
	@Lazy
	private UserDetailsServiceImpl userDetailsServiceImpl;

	@Lazy
	private AuthenticationManager authenticationManager;

	@Lazy
	private TokenUtil jwtTokenUtil;

	private TokenUtil tokenUtil;

	@Override
	public TokenJwtDTO authenticateAndGenerateToken(String username, String password) {
		authenticate(username, password);
		UserDetails userDetails = loadUserByUsername(username);

		String generateToken = generateToken(userDetails);

		Date expirationDateFromToken = tokenUtil.getExpirationDateFromToken(generateToken);
		
		UserDTO userDtoCurrent = extractUserDtoFromUserDetails(userDetails);

		TokenJwtDTO token = TokenJwtDTO.builder().token(generateToken).expire(convertToLocalDateTimeViaInstant(expirationDateFromToken)).userDTO(userDtoCurrent)
				.build();

		return token;
	}

	@Override
	public void authenticate(String username, String password) {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			throw new UserDisabledException("User disabled " + e);
		} catch (BadCredentialsException e) {
			throw new BadCredentialsCustomException("invalid credentials ");
		}
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return userDetailsServiceImpl.loadUserByUsername(username);
	}
	
	public UserDTO extractUserDtoFromUserDetails(UserDetails userDetails) {
		AcessoUser acessoUser = (AcessoUser) userDetails;
		return convertUserEntityToUSerDto(acessoUser.getUser());
	}
	
	private UserDTO convertUserEntityToUSerDto(User user) {
		return UserDTO.builder().email(user.getEmail()).name(user.getName()).username(user.getUsername()).viewProfile(user.isViewProfile()).build();
	}

	@Override
	public String generateToken(UserDetails userDetails) {
		return jwtTokenUtil.generateToken(userDetails);
	}

	private LocalDateTime convertToLocalDateTimeViaInstant(Date dateToConvert) {
		return dateToConvert.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
	}
}
