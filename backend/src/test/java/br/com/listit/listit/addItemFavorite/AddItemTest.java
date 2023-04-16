package br.com.listit.listit.addItemFavorite;

import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import br.com.listit.listit.addItemFavorite.mock.AnimeMock;
import br.com.listit.listit.domain.entity.ItemAnimeEntity;
import br.com.listit.listit.domain.entity.ListAnimeEntity;
import br.com.listit.listit.domain.entity.TypeList;
import br.com.listit.listit.domain.entity.User;
import br.com.listit.listit.exception.OperationException;
import br.com.listit.listit.repository.ListAnimeEntityRepository;
import br.com.listit.listit.services.anime.AnimeService;
import br.com.listit.listit.services.anime.ListAnimeEntityServiceImpl;
import br.com.listit.listit.services.remote.exceptions.BadRequestClientServiceException;
import br.com.listit.listit.services.user.UserService;

@DisplayName("test addItem")
@ExtendWith(SpringExtension.class)
class AddItemTest {
	
	@Mock
	private ListAnimeEntityRepository listAnimeEntityRepository;
	
	@Test
	void when_listNotFound() {
		
		ListAnimeEntityServiceImpl listAnimeEntityService = new ListAnimeEntityServiceImpl();
		
		User user = new User();
		user.setListAnime(new ArrayList<>());
		
		UserService userService = mock(UserService.class);
		when(userService.getUserCurrent()).thenReturn(Optional.of(user));

		
		listAnimeEntityService.setUserService(userService);
		
		Assertions.assertThatThrownBy(() -> {
			listAnimeEntityService.addItem(TypeList.ASSISTINDO, 1);
		}).isInstanceOf(OperationException.class)
		.hasMessage("List Not found");
	}
	
	@Test
	void when_AnimeNotExists() {
		ListAnimeEntityServiceImpl listAnimeEntityService = new ListAnimeEntityServiceImpl();
		
		ListAnimeEntity listAnimeEntity = new ListAnimeEntity();
		listAnimeEntity.setType(TypeList.ASSISTINDO);
		
		User user = new User();
		user.setListAnime(List.of(listAnimeEntity));
		
		UserService userService = mock(UserService.class);
		when(userService.getUserCurrent()).thenReturn(Optional.of(user));
		
		AnimeService animeService = mock(AnimeService.class);
		when(animeService.findAnimeByID(anyInt())).thenThrow(new BadRequestClientServiceException());

		
		listAnimeEntityService.setAnimeService(animeService);
		listAnimeEntityService.setUserService(userService);
		
		Assertions.assertThatThrownBy(() -> {
			listAnimeEntityService.addItem(TypeList.ASSISTINDO, 1);
		}).isInstanceOf(BadRequestClientServiceException.class);
	}
	
	@Test
	void when_findListByIDItemsIsNull() {
		ListAnimeEntityServiceImpl listAnimeEntityService = new ListAnimeEntityServiceImpl();
		
		ListAnimeEntity listAnimeEntity = new ListAnimeEntity();
		listAnimeEntity.setType(TypeList.ASSISTINDO);
		listAnimeEntity.setItems(null);
		
		User user = new User();
		user.setListAnime(List.of(listAnimeEntity));
		
		UserService userService = mock(UserService.class);
		when(userService.getUserCurrent()).thenReturn(Optional.of(user));
		
		AnimeService animeService = mock(AnimeService.class);
		when(animeService.findAnimeByID(anyInt())).thenReturn(AnimeMock.getAnimeRecord());

		when(listAnimeEntityRepository.save(listAnimeEntity)).thenReturn(listAnimeEntity);
		
		listAnimeEntityService.setAnimeService(animeService);
		listAnimeEntityService.setUserService(userService);
		listAnimeEntityService.setListAnimeEntityRepository(listAnimeEntityRepository);
		
		Assertions.assertThat(listAnimeEntityService.addItem(TypeList.ASSISTINDO, 1).getItems())
					.contains(AnimeMock.getAnimeRecord())
					.hasSize(1);
	}
	
	@Test
	void when_animeIsAlreadyInTheList() {
		ListAnimeEntityServiceImpl listAnimeEntityService = new ListAnimeEntityServiceImpl();
		
		ItemAnimeEntity itemAnimeEntity = new ItemAnimeEntity();
		itemAnimeEntity.setIdAnime(AnimeMock.getAnimeRecord().getId());
		
		ListAnimeEntity listAnimeEntity = new ListAnimeEntity();
		listAnimeEntity.setType(TypeList.ASSISTINDO);
		listAnimeEntity.setItems(List.of(itemAnimeEntity));
		
		User user = new User();
		user.setListAnime(List.of(listAnimeEntity));
		
		UserService userService = mock(UserService.class);
		when(userService.getUserCurrent()).thenReturn(Optional.of(user));
		
		AnimeService animeService = mock(AnimeService.class);
		when(animeService.findAnimeByID(anyInt())).thenReturn(AnimeMock.getAnimeRecord());
		
		listAnimeEntityService.setAnimeService(animeService);
		listAnimeEntityService.setUserService(userService);
		
		Assertions.assertThatThrownBy(() -> {
			listAnimeEntityService.addItem(TypeList.ASSISTINDO, 1);
		}).isInstanceOf(OperationException.class)
		.hasMessage("anime is already in the list");
	}
	
	@Test
	void when_sucessfull() {
		ListAnimeEntityServiceImpl listAnimeEntityService = new ListAnimeEntityServiceImpl();
		
		ItemAnimeEntity itemAnimeEntity = new ItemAnimeEntity();
		itemAnimeEntity.setIdAnime(AnimeMock.getAnimeRecord().getId()+1);
		
		ListAnimeEntity listAnimeEntity = new ListAnimeEntity();
		listAnimeEntity.setType(TypeList.ASSISTINDO);
		listAnimeEntity.setItems(new ArrayList<>(List.of(itemAnimeEntity)));
		
		User user = new User();
		user.setListAnime(List.of(listAnimeEntity));
		
		UserService userService = mock(UserService.class);
		when(userService.getUserCurrent()).thenReturn(Optional.of(user));
		
		AnimeService animeService = mock(AnimeService.class);
		when(animeService.findAnimeByID(anyInt())).thenReturn(AnimeMock.getAnimeRecord());

		when(listAnimeEntityRepository.save(listAnimeEntity)).thenReturn(listAnimeEntity);
		
		listAnimeEntityService.setAnimeService(animeService);
		listAnimeEntityService.setUserService(userService);
		listAnimeEntityService.setListAnimeEntityRepository(listAnimeEntityRepository);
		
		Assertions.assertThat(listAnimeEntityService.addItem(TypeList.ASSISTINDO, 1).getItems())
					.contains(AnimeMock.getAnimeRecord())
					.hasSize(2);
	}

}
