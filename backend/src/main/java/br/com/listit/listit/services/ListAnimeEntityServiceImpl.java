package br.com.listit.listit.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import br.com.listit.listit.domain.entity.ItemAnimeEntity;
import br.com.listit.listit.domain.entity.ListAnimeEntity;
import br.com.listit.listit.domain.entity.TypeList;
import br.com.listit.listit.domain.entity.User;
import br.com.listit.listit.exception.ListAnimeNotFoundException;
import br.com.listit.listit.exception.OperationException;
import br.com.listit.listit.exception.UserNotFoundException;
import br.com.listit.listit.repository.ListAnimeEntityRepository;
import br.com.listit.listit.web.dto.AnimeRecord;
import br.com.listit.listit.web.dto.ListAnimeDTO;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@AllArgsConstructor
@Log4j2
public class ListAnimeEntityServiceImpl implements ListAnimeEntityService {
	
	private ListAnimeEntityRepository listAnimeEntityRepository;
	private AnimeService animeService;
	private UserService userService;
	
	
	public List<ListAnimeDTO> createAllList() {
		User userCurrent = getUSerCurrent();
		
		if(userCurrent.getListAnime()==null || userCurrent.getListAnime().isEmpty()) {
			throw new OperationException("user I already have lists created");
		}
		
		List<ListAnimeDTO> allListsFromUserCurrent = new ArrayList<>();
		TypeList[] values = TypeList.values();
		
		Arrays.stream(values).forEach((type)->{
			ListAnimeDTO listCreated = createList(type);
			allListsFromUserCurrent.add(listCreated);
		});
		
		return allListsFromUserCurrent;
	}
	
	@Override
	public ListAnimeDTO createList(TypeList typeList) {
		User userCurrent = getUSerCurrent();
		ListAnimeEntity listAnime = ListAnimeEntity.builder()
		.type(typeList)
		.items(new ArrayList<ItemAnimeEntity>())
		.user(userCurrent)
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

	@Override
	public ListAnimeDTO addItemFavorite(int idAnime) {
		User userCurrent = getUSerCurrent();
		ListAnimeEntity findListByID = userCurrent.getListAnime().stream().filter(l -> TypeList.FAVORITO.equals(l.getType())).findFirst().get();
		
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
	
	private User getUSerCurrent() {
		Optional<User> userCurrent = userService.getUserCurrent();
		User user = null;

		user = userCurrent.orElseGet(() -> {
			throw new UserNotFoundException("User not found");
		});

		return user;
	}
}
