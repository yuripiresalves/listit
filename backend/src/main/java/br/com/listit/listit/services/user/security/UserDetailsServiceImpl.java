package br.com.listit.listit.services.user.security;

import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.com.listit.listit.domain.entity.AcessoUser;
import br.com.listit.listit.domain.entity.User;
import br.com.listit.listit.repository.UserRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserDetailsServiceImpl implements ListItUserDetailsService {
	private UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException(username);
        }
        return new AcessoUser(userOptional.get());
	}
	
	@Override
	public UserDetails loadUserByEmail(String email) throws UsernameNotFoundException {
		Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException(email);
        }
        return new AcessoUser(userOptional.get());
	}

}
