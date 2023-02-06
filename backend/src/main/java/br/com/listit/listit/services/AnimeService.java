package br.com.listit.listit.services;

import java.util.List;

import br.com.listit.listit.domain.dto.AnimeRecord;


public interface AnimeService {
	AnimeRecord findAnimeByID(int id);
}
