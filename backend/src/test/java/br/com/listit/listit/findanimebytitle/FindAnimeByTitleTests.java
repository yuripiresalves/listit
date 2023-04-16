package br.com.listit.listit.findanimebytitle;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.List;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import br.com.listit.listit.web.dto.AnimeRecord;
import br.com.listit.listit.findanimebytitle.mock.AnimeListMock;
import br.com.listit.listit.services.anime.AnimeService;
import br.com.listit.listit.services.anime.AnimeServiceImpl;
import br.com.listit.listit.services.remote.exceptions.BadRequestClientServiceException;
import br.com.listit.listit.services.remote.jikan.ClientRemoteApiJikan;

@DisplayName("test findAnimeByTitle")
class FindAnimeByTitleTests {
	
		@Test
		void when_sucessfull() {
			ClientRemoteApiJikan clientRemoteApiJikan = mock(ClientRemoteApiJikan.class);
			
			when(clientRemoteApiJikan.searchByName(anyString())).thenReturn(AnimeListMock.getAnimeList());
			
			AnimeService animeService = new AnimeServiceImpl(clientRemoteApiJikan);
			
			List<AnimeRecord> animes = animeService.findAnimeByTitle("death note");
			
			Assertions.assertThat(animes)
						.isNotEmpty()
						.doesNotContainNull()
						.doesNotHaveDuplicates()
						.hasSameElementsAs(AnimeListMock.getAnimeRecordList())
						.hasSize(5);
		}
		
		@Test
		void when_badRequestClientServiceException() {
			ClientRemoteApiJikan clientRemoteApiJikan = mock(ClientRemoteApiJikan.class);
			
			doThrow(new BadRequestClientServiceException("Erro search animes => death")).when(clientRemoteApiJikan).searchByName(anyString());
			
			AnimeService animeService = new AnimeServiceImpl(clientRemoteApiJikan);
			
			Assertions.assertThatThrownBy(()->{
				animeService.findAnimeByTitle("death");
			}).isInstanceOf(BadRequestClientServiceException.class)
			  .hasMessageContaining("Erro search animes => death");
		}
		
		@Test
		void when_listEmpty() {
			ClientRemoteApiJikan clientRemoteApiJikan = mock(ClientRemoteApiJikan.class);
			
			when(clientRemoteApiJikan.searchByName(anyString())).thenReturn(List.of());
			
			AnimeService animeService = new AnimeServiceImpl(clientRemoteApiJikan);
			
			List<AnimeRecord> animes = animeService.findAnimeByTitle("death");
			
			Assertions.assertThat(animes)
			.isEmpty();
		}
		
		@Test
		void when_listNull() {
			ClientRemoteApiJikan clientRemoteApiJikan = mock(ClientRemoteApiJikan.class);
			
			when(clientRemoteApiJikan.searchByName(anyString())).thenReturn(null);
			
			AnimeService animeService = new AnimeServiceImpl(clientRemoteApiJikan);
			
			Assertions.assertThatThrownBy(()->{
				animeService.findAnimeByTitle("death");
			}).isInstanceOf(BadRequestClientServiceException.class)
			  .hasMessageContaining("not found animes");
		}


}
