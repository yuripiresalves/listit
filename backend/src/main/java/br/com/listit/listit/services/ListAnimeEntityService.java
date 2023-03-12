package br.com.listit.listit.services;

import java.util.List;

import br.com.listit.listit.domain.entity.TypeList;
import br.com.listit.listit.web.dto.ListAnimeDTO;

public interface ListAnimeEntityService {
	
	ListAnimeDTO createList(TypeList typeList);
	ListAnimeDTO getById(int id);
	ListAnimeDTO addItem(int idList, int idAnime);
	ListAnimeDTO addItemFavorite(int idAnime);
	void removeItem(int idList, int idAnime);
	List<ListAnimeDTO> createAllList();
}
