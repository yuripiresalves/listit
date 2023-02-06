package br.com.listit.listit.services.remote.jikan;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import br.com.listit.listit.services.remote.exceptions.BadRequestClientServiceException;
import lombok.NoArgsConstructor;
import net.sandrohc.jikan.Jikan;
import net.sandrohc.jikan.model.anime.Anime;

@Service
@NoArgsConstructor
public class ClientRemoteApiJikan {

	public List<Anime> searchByName(String name) {
		Jikan jikan = JikanSimpleFactory.createJikan();
		List<Anime> animeSearchList = new ArrayList<>();
		try {
			animeSearchList = jikan.query().anime().search().limit(50).query(name).execute().buffer()
					.blockLast(Duration.ofMillis(5000));

		} catch (Exception e) {
			throw new BadRequestClientServiceException("Erro search animes => "+e.getMessage());
		}

		return animeSearchList;
	}
	
	public Anime searchById(int id) {
		Jikan jikan = JikanSimpleFactory.createJikan();
		Anime anime = new Anime();
		try {
			anime = jikan.query().anime().get(id).execute().block(Duration.ofMillis(5000));

		} catch (Exception e) {
			throw new BadRequestClientServiceException("Erro search animes by id "+id+" => "+e.getMessage());
		}

		return anime;
	}

}
