package br.com.listit.listit.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Optional;

import org.springframework.stereotype.Service;

import br.com.listit.listit.domain.entity.ItemAnimeEntity;
import br.com.listit.listit.domain.entity.ListAnimeEntity;
import br.com.listit.listit.domain.entity.TypeList;
import br.com.listit.listit.exception.ListAnimeNotFoundException;
import br.com.listit.listit.repository.ListAnimeEntityRepository;
import br.com.listit.listit.web.dto.AnimeRecord;
import br.com.listit.listit.web.dto.ListAnimeDTO;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ListAnimeEntityServiceImpl implements ListAnimeEntityService {
	
	private ListAnimeEntityRepository listAnimeEntityRepository;
	private AnimeService animeService;
	
	@Override
	public ListAnimeDTO createList(TypeList typeList) {
		ListAnimeEntity listAnime = ListAnimeEntity.builder()
		.type(typeList)
		.items(new ArrayList<ItemAnimeEntity>())
		.build();
		
		ListAnimeEntity save = listAnimeEntityRepository.save(listAnime);
		
		return convertListAnimeEntityToListAnimeDTO(save);
	}

	@Override
	public ListAnimeDTO getById(int id) {
		return convertListAnimeEntityToListAnimeDTO(findListByID(id));
	}

	@Override
	public ListAnimeDTO addItem(int idList, int idAnime) {
		ListAnimeEntity findListByID = findListByID(idList);
		animeService.findAnimeByID(idAnime);
		
		if(findListByID.getItems()==null) {
			findListByID.setItems(new ArrayList<>());
		}
		
		ItemAnimeEntity item = ItemAnimeEntity.builder()
		.dateOfEntry(LocalDate.now())
		.idAnime(idAnime)
		.build();
		
		findListByID.getItems().add(item);
		
		ListAnimeEntity save = listAnimeEntityRepository.save(findListByID);
		
		return convertListAnimeEntityToListAnimeDTO(save);
	}

	@Override
	public void removeItem(int idList, int idAnime) {
		ListAnimeEntity findListByID = findListByID(idList);
		animeService.findAnimeByID(idAnime);
		
		if(findListByID.getItems()==null) {
			return;
		}
		
		findListByID.getItems().removeIf(e->{
			return e.getIdAnime() == idAnime;
		});
		
		
		listAnimeEntityRepository.save(findListByID);
	}
	
	private ListAnimeEntity findListByID(int id) {
		Optional<ListAnimeEntity> findById = listAnimeEntityRepository.findById(id);
		ListAnimeEntity animeList = findById.orElseThrow(()->{
			throw new ListAnimeNotFoundException("List anime not found. id = "+id+" not found");
		});
		return animeList;
	}

	private ListAnimeDTO convertListAnimeEntityToListAnimeDTO(ListAnimeEntity listAnimeEntity) {
		 ListAnimeDTO build = ListAnimeDTO.builder()
				.id(listAnimeEntity.getId())
				.type(listAnimeEntity.getType())
				.items(new ArrayList<>())
				.build();
		 
		 if(listAnimeEntity.getItems() != null) {
			 listAnimeEntity.getItems().forEach(e->{
				 build.getItems().add(convertItemAnimeEntityToAnimeRecord(e));
			 });
		 }
		 
		 return build;
	}
	
	private AnimeRecord  convertItemAnimeEntityToAnimeRecord(ItemAnimeEntity item) {
		return animeService.findAnimeByID(item.getIdAnime());
	}
}
