package br.com.listit.listit.services.anime;


import java.util.List;

import br.com.listit.listit.web.dto.AnimeRecord;


public interface AnimeService {
	List<AnimeRecord> findAnimeByTitle(String title);
	AnimeRecord findAnimeByID(int id);
}
