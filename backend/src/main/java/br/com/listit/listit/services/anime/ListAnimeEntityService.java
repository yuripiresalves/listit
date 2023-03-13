package br.com.listit.listit.services.anime;

import java.util.List;

import br.com.listit.listit.domain.entity.TypeList;
import br.com.listit.listit.web.dto.ListAnimeDTO;

public interface ListAnimeEntityService {
	
	ListAnimeDTO createList(TypeList typeList);
	ListAnimeDTO getByTypeList(TypeList type);
	ListAnimeDTO addItem(TypeList type, int idAnime);
	ListAnimeDTO addItemFavorite(int idAnime);
	void removeItem(TypeList type, int idAnime);
	List<ListAnimeDTO> createAllList();
	List<ListAnimeDTO> getAll();
	List<ListAnimeDTO> getAllListsByUsername(String id);
}
