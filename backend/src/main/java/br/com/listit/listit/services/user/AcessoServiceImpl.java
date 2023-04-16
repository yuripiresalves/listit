package br.com.listit.listit.services.user;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Collections;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;

import br.com.listit.listit.domain.entity.AcessoUser;
import br.com.listit.listit.domain.entity.User;
import br.com.listit.listit.exception.BadCredentialsCustomException;
import br.com.listit.listit.exception.UserDisabledException;
import br.com.listit.listit.services.anime.ListAnimeEntityService;
import br.com.listit.listit.services.user.security.ListItUserDetailsService;
import br.com.listit.listit.web.dto.UserAllFieldsDTO;
import br.com.listit.listit.web.dto.TokenJwtDTO;
import br.com.listit.listit.web.dto.UserDTO;
import br.com.listit.listit.web.security.token.TokenUtil;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AcessoServiceImpl implements AcessoService {
	@Lazy
	private ListItUserDetailsService userDetailsServiceImpl;
	
	@Lazy
	private UserService userService;

	@Lazy
	private AuthenticationManager authenticationManager;

	@Lazy
	private TokenUtil jwtTokenUtil;
	
	@Lazy
	private ListAnimeEntityService listAnimeEntityService;
	
	@Lazy
	private TokenUtil tokenUtil;
	
	private static String idClientGoogle;
	
	@Override
	public TokenJwtDTO authenticateAndGenerateToken(String username, String password) {
		authenticate(username, password);
		UserDetails userDetails = loadUserByUsername(username);
		
		return generateTokenFromUserDetails(userDetails);
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
		return UserDTO.builder().email(user.getEmail()).name(user.getName()).username(user.getUsername()).viewProfile(user.isViewProfile()).urlImage(user.getUrlImage()).description(user.getDescription()).build();
	}

	@Override
	public String generateToken(UserDetails userDetails) {
		return jwtTokenUtil.generateToken(userDetails);
	}

	private LocalDateTime convertToLocalDateTimeViaInstant(Date dateToConvert) {
		return dateToConvert.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
	}

	@Override
	public TokenJwtDTO authenticateGoogle(String tokenUser) {
		String jwt = tokenUser;
		GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
				.setAudience(Collections.singletonList(idClientGoogle)).build();

		GoogleIdToken idToken;

		try {
			idToken = verifier.verify(jwt);
		} catch (GeneralSecurityException | IOException e) {
			throw new BadCredentialsCustomException("Cannot verify the ID_TOKEN send :" + e.getMessage());
		}

		if (idToken == null) {
			throw new BadCredentialsCustomException("Failed to verify the ID_TOKEN send");
		}

		String email = idToken.getPayload().getEmail();
		
		UserDetails userDetails = null;
		
		try {
			userDetails = userDetailsServiceImpl.loadUserByEmail(email);
		}catch (UsernameNotFoundException e) {
			UserAllFieldsDTO extratUserFromIdToken = extratUserFromIdToken(idToken);
			userService.createUser(extratUserFromIdToken);
			listAnimeEntityService.createAllListFoundUserByUsername(extratUserFromIdToken.getUsername());
			userDetails = userDetailsServiceImpl.loadUserByEmail(extratUserFromIdToken.getEmail());
		}
		
		return generateTokenFromUserDetails(userDetails);
	}
	
	private UserAllFieldsDTO extratUserFromIdToken(GoogleIdToken idToken) {
		Payload payload = idToken.getPayload();
		
		 return  UserAllFieldsDTO.builder()
				.email(payload.getEmail())
				.name(payload.get("name").toString())
				.urlImage(payload.get("picture").toString())
				.viewProfile(true)
				.username(payload.getEmail())
				.build();
	}
	
	private TokenJwtDTO generateTokenFromUserDetails(UserDetails userDetails) {
		String generateToken = generateToken(userDetails);

		Date expirationDateFromToken = tokenUtil.getExpirationDateFromToken(generateToken);
		
		UserDTO userDtoCurrent = extractUserDtoFromUserDetails(userDetails);

		TokenJwtDTO token = TokenJwtDTO.builder().token(generateToken).expire(convertToLocalDateTimeViaInstant(expirationDateFromToken)).userDTO(userDtoCurrent)
				.build();

		return token;
	}

	@Value("${google.id-cliente}")
	private void setIdClientGoogle(String idClientGoogle) {
		AcessoServiceImpl.idClientGoogle = idClientGoogle;
	}
	
}
