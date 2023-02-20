package br.com.listit.listit.services;

import br.com.listit.listit.domain.dto.AnimeRecord;


public interface AnimeService {
	AnimeRecord findAnimeByID(int id);
}
