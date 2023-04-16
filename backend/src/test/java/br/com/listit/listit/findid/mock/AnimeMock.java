package br.com.listit.listit.findid.mock;

import br.com.listit.listit.web.dto.AnimeRecord;
import net.sandrohc.jikan.model.anime.Anime;

public class AnimeMock {
	public static Anime getAnime() {
		Anime anime = new Anime();

		anime.setUrl("www.anime.com");
		anime.setPopularity(9);
		anime.setScore(9.6);
		anime.setImages(null);
		anime.setTitle("title");
		anime.setTitleEnglish("title english");
		anime.setTitleJapanese("ヘルプ");
		anime.setSynopsis("synopsis");
		anime.setEpisodes(9);
		
		return anime;
	}
	
	public static AnimeRecord getAnimeRecord() {
		return AnimeRecord.builder()
				.score(9.6)
				.imageJPG(null)
				.episodes(9)
				.synopsis("synopsis")
				.title("title")
				.titleEnglish("title english")
				.titleJapanese("ヘルプ")
				.build();
	}
}
