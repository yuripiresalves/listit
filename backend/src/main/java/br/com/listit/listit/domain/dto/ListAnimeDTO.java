package br.com.listit.listit.domain.dto;

import java.util.List;

import br.com.listit.listit.domain.entity.TypeList;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ListAnimeDTO {
	private int id;
	
	private TypeList type;
	
	private List<AnimeRecord> items;
}
