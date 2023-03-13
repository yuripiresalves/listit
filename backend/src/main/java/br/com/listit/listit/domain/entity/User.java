package br.com.listit.listit.domain.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user_listit")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class User {

	@Id @GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String name;
	
	@Column(unique = true)
	private String email;

	@Column(unique = true)
	private String username;
	
	private String password;
	
	@OneToMany(fetch = FetchType.EAGER, mappedBy = "user", cascade = CascadeType.ALL)
	private List<ListAnimeEntity> listAnime;
	
	@Column(columnDefinition = "boolean default true")
	@Builder.Default
	private boolean viewProfile  = true;
	
	@Column(length = 320)
	private String description;
}
