package br.com.listit.listit.services;


import java.util.List;
import br.com.listit.listit.domain.dto.AnimeRecord;


public interface AnimeService {
	List<AnimeRecord> findAnimeByTitle(String title);
	AnimeRecord findAnimeByID(int id);
}
