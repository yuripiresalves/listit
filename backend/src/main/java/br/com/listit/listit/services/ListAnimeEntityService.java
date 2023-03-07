package br.com.listit.listit.services;

import br.com.listit.listit.domain.entity.TypeList;
import br.com.listit.listit.web.dto.ListAnimeDTO;

public interface ListAnimeEntityService {
	
	ListAnimeDTO createList(TypeList typeList);
	ListAnimeDTO getById(int id);
	ListAnimeDTO addItem(int idList, int idAnime);
	void removeItem(int idList, int idAnime);

}
