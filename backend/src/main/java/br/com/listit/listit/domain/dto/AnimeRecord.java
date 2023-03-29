package br.com.listit.listit.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@RequiredArgsConstructor
@Data
@Builder
@EqualsAndHashCode
public class AnimeRecord {
	
	private int id;
	
	private String title;
	
	private String titleJapanese;
	
	private String titleEnglish;
	
	private int episodes;
	
	private double score;
	
	private ImageJPG imageJPG;
	
	private String synopsis;
	
}
