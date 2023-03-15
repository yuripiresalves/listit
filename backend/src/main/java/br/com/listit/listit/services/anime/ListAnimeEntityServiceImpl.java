package br.com.listit.listit.services.anime;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import br.com.listit.listit.domain.entity.ItemAnimeEntity;
import br.com.listit.listit.domain.entity.ListAnimeEntity;
import br.com.listit.listit.domain.entity.TypeList;
import br.com.listit.listit.domain.entity.User;
import br.com.listit.listit.exception.ListAnimeNotFoundException;
import br.com.listit.listit.exception.OperationException;
import br.com.listit.listit.exception.UserNotFoundException;
import br.com.listit.listit.repository.ListAnimeEntityRepository;
import br.com.listit.listit.repository.UserRepository;
import br.com.listit.listit.services.user.UserService;
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
	private UserRepository userRepository;

	public List<ListAnimeDTO> createAllListFoundUserByUsername(String username) {
		User userCurrent = userRepository.findByUsername(username).get();

		if (!userCurrent.getListAnime().isEmpty()) {
			throw new OperationException("user already have lists created");
		}

		List<ListAnimeDTO> allListsFromUserCurrent = new ArrayList<>();
		TypeList[] values = TypeList.values();

		Arrays.stream(values).forEach((type) -> {
			ListAnimeDTO listCreated = createList(type, userCurrent);
			allListsFromUserCurrent.add(listCreated);
		});

		return allListsFromUserCurrent;
	}

	public ListAnimeDTO createList(TypeList typeList, User user) {
		ListAnimeEntity listAnime = ListAnimeEntity.builder().type(typeList).items(new ArrayList<ItemAnimeEntity>())
				.user(user).build();

		ListAnimeEntity save = listAnimeEntityRepository.save(listAnime);

		return convertListAnimeEntityToListAnimeDTO(save);
	}

	@Override
	public List<ListAnimeDTO> getAll() {
		User userCurrent = getUserCurrent();
		List<ListAnimeDTO> lists = userCurrent.getListAnime().stream().map(this::convertListAnimeEntityToListAnimeDTO).collect(Collectors.toList());
		return lists;
	}
	
	@Override
	public List<ListAnimeDTO> getAllListsByUsername(String username) {
		User userCurrent = extractUserFromOptional(userRepository.findByUsername(username));
		
		if(!userCurrent.isViewProfile()) {
			throw new OperationException("the user doesn't want you to see his list");
		}
		
		List<ListAnimeDTO> lists = userCurrent.getListAnime().stream().map(this::convertListAnimeEntityToListAnimeDTO).collect(Collectors.toList());
		return lists;
	}
	
	
	@Override
	public ListAnimeDTO getByTypeList(TypeList type) {
		Optional<ListAnimeEntity> findFirst = getUserCurrent().getListAnime().stream().filter(l -> l.getType().equals(type)).findFirst();
		
		ListAnimeEntity listAnimeEntity = findFirst.orElseThrow(()-> new OperationException("List Not found"));
		
		return convertListAnimeEntityToListAnimeDTO(listAnimeEntity);
	}

	@Override
	public ListAnimeDTO addItem(TypeList type, int idAnime) {
		Optional<ListAnimeEntity> findFirst = getUserCurrent().getListAnime().stream().filter(l -> l.getType().equals(type)).findFirst();
		
		ListAnimeEntity findListByID = findFirst.orElseThrow(()-> new OperationException("List Not found"));

		animeService.findAnimeByID(idAnime);

		if (findListByID.getItems() == null) {
			findListByID.setItems(new ArrayList<>());
		}

		ItemAnimeEntity item = ItemAnimeEntity.builder().dateOfEntry(LocalDate.now()).idAnime(idAnime).build();

		findListByID.getItems().add(item);

		ListAnimeEntity save = listAnimeEntityRepository.save(findListByID);

		return convertListAnimeEntityToListAnimeDTO(save);
	}

	@Override
	public void removeItem(TypeList type, int idAnime) {
		Optional<ListAnimeEntity> findFirst = getUserCurrent().getListAnime().stream().filter(l -> l.getType().equals(type)).findFirst();
		
		ListAnimeEntity findListByID = findFirst.orElseThrow(()-> new OperationException("List Not found"));
		animeService.findAnimeByID(idAnime);

		if (findListByID.getItems() == null) {
			return;
		}

		findListByID.getItems().removeIf(e -> {
			return e.getIdAnime() == idAnime;
		});

		listAnimeEntityRepository.save(findListByID);
	}

	private ListAnimeDTO convertListAnimeEntityToListAnimeDTO(ListAnimeEntity listAnimeEntity) {
		ListAnimeDTO build = ListAnimeDTO.builder().id(listAnimeEntity.getId()).type(listAnimeEntity.getType())
				.items(new ArrayList<>()).build();

		if (listAnimeEntity.getItems() != null) {
			listAnimeEntity.getItems().forEach(e -> {
				build.getItems().add(convertItemAnimeEntityToAnimeRecord(e));
			});
		}

		return build;
	}

	private AnimeRecord convertItemAnimeEntityToAnimeRecord(ItemAnimeEntity item) {
		return animeService.findAnimeByID(item.getIdAnime());
	}

	@Override
	public ListAnimeDTO addItemFavorite(int idAnime) {
		User userCurrent = getUserCurrent();
		
		if (userCurrent.getListAnime().isEmpty()) {
			throw new OperationException("user already have lists created");
		}
		
		ListAnimeEntity findListByID = userCurrent.getListAnime().stream()
				.filter(l -> TypeList.FAVORITO.equals(l.getType())).findFirst().get();

		animeService.findAnimeByID(idAnime);

		if (findListByID.getItems() == null) {
			findListByID.setItems(new ArrayList<>());
		}

		ItemAnimeEntity item = ItemAnimeEntity.builder().dateOfEntry(LocalDate.now()).idAnime(idAnime).build();

		findListByID.getItems().add(item);

		ListAnimeEntity save = listAnimeEntityRepository.save(findListByID);

		return convertListAnimeEntityToListAnimeDTO(save);
	}

	private User getUserCurrent() {
		Optional<User> userCurrent = userService.getUserCurrent();
		User user = null;

		user = extractUserFromOptional(userCurrent);

		return user;
	}
	
	private User extractUserFromOptional(Optional<User> userCurrent) {
		return userCurrent.orElseGet(() -> {
			throw new UserNotFoundException("User not found");
		});
	}
}
