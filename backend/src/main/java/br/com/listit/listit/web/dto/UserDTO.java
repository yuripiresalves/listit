package br.com.listit.listit.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserDTO {

	private String name;
	
	private String email;

	private String username;

	private boolean viewProfile;
	
	private String password;
	
	private String description;
}
