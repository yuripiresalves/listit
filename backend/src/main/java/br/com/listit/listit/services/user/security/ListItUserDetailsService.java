package br.com.listit.listit.services.user.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface ListItUserDetailsService extends UserDetailsService {
	UserDetails loadUserByEmail(String email);
}
