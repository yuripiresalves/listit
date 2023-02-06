package br.com.listit.listit.domain.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "item_anime")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ItemAnimeEntity {
	@Id @GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	private LocalDate dateOfEntry;
	
	private int idAnime;
}
