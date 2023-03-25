package br.com.listit.listit.findid;

import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import br.com.listit.listit.domain.dto.AnimeRecord;
import br.com.listit.listit.findid.mock.AnimeMock;
import br.com.listit.listit.services.AnimeService;
import br.com.listit.listit.services.AnimeServiceImpl;
import br.com.listit.listit.services.remote.exceptions.BadRequestClientServiceException;
import br.com.listit.listit.services.remote.jikan.ClientRemoteApiJikan;

@DisplayName("test findAnimeByID")
class FindByIdTests {
	
	@Test
	void when_sucessfull() {
		ClientRemoteApiJikan clientRemoteApiJikan = mock(ClientRemoteApiJikan.class);
		
		when(clientRemoteApiJikan.searchById(anyInt())).thenReturn(AnimeMock.getAnime());
		
		AnimeService animeService = new AnimeServiceImpl(clientRemoteApiJikan);
		
		AnimeRecord anime = animeService.findAnimeByID(1);
		
		Assertions.assertThat(anime).isEqualTo(AnimeMock.getAnimeRocord());
	}
	
	@Test
	void when_badRequestClientServiceException() {
		ClientRemoteApiJikan clientRemoteApiJikan = mock(ClientRemoteApiJikan.class);
		
		doThrow(new BadRequestClientServiceException("Erro search animes by id")).when(clientRemoteApiJikan).searchById(anyInt());
		
		AnimeService animeService = new AnimeServiceImpl(clientRemoteApiJikan);
		
		Assertions.assertThatThrownBy(()->{
			animeService.findAnimeByID(1);
		}).isInstanceOf(BadRequestClientServiceException.class)
		  .hasMessageContaining("Erro search animes by id");
	}
	
	@Test
	void when_notFoundAnime() {
		ClientRemoteApiJikan clientRemoteApiJikan = mock(ClientRemoteApiJikan.class);
		
		when(clientRemoteApiJikan.searchById(anyInt())).thenReturn(null);
		
		AnimeService animeService = new AnimeServiceImpl(clientRemoteApiJikan);
		
		Assertions.assertThatThrownBy(()->{
			animeService.findAnimeByID(1);
		}).isInstanceOf(BadRequestClientServiceException.class)
		  .hasMessageContaining("Erro anime not found");
	}

}
