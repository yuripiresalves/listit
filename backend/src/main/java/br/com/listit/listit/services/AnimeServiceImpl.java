package br.com.listit.listit.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.listit.listit.services.remote.jikan.ClientRemoteApiJikan;
import br.com.listit.listit.web.dto.AnimeRecord;
import br.com.listit.listit.web.dto.ImageJPG;
import lombok.AllArgsConstructor;
import net.sandrohc.jikan.model.anime.Anime;

@Service
@AllArgsConstructor
public class AnimeServiceImpl implements AnimeService {
	
	private ClientRemoteApiJikan clientRemoteApiJikan;

	@Override
	public List<AnimeRecord> findAnimeByTitle(String title) {
		List<Anime> searchByName = clientRemoteApiJikan.searchByName(title);
		List<AnimeRecord> animeRecordList = searchByName.stream().map(s -> convertAnimeToAnimeRecordEntity(s)).collect(Collectors.toList());
		return animeRecordList;
	}
	
	public AnimeRecord findAnimeByID(int id) {
		Anime searchById = clientRemoteApiJikan.searchById(id);
		
		return convertAnimeToAnimeRecordEntity(searchById);
	}

	private AnimeRecord convertAnimeToAnimeRecordEntity(Anime anime) {
		ImageJPG imageJpgConverted = convertImageJPGToImageEntity(anime.getImages().jpg);
		
		return AnimeRecord.builder()
				.id(anime.getMalId())
				.title(anime.getTitle())
				.titleEnglish(anime.getTitleEnglish())
				.titleJapanese(anime.getTitleJapanese())
				.episodes(anime.getEpisodes() == null ? 0:anime.getEpisodes())
				.score(anime.getScore())
				.imageJPG(imageJpgConverted)
				.synopsis(anime.getSynopsis())
				.build();
	}
	
	private ImageJPG convertImageJPGToImageEntity(net.sandrohc.jikan.model.common.Image jpg) {
		ImageJPG image = ImageJPG.builder()
			.imageURL(jpg.getImageUrl())
			.smallImageURL(jpg.smallImageUrl)
			.largeImageURL(jpg.largeImageUrl)
			.build();
		return image;
	}

}
