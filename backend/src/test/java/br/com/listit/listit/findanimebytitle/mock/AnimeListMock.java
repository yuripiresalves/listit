package br.com.listit.listit.findanimebytitle.mock;

import java.util.ArrayList;
import java.util.List;

import br.com.listit.listit.web.dto.AnimeRecord;
import net.sandrohc.jikan.model.anime.Anime;

public class AnimeListMock {
	public static Anime getAnime() {
		Anime anime = new Anime();

		anime.setUrl("www.anime.com");
		anime.setPopularity(15);
		anime.setScore(9.6);
		anime.setImages(null);
		anime.setTitle("Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.");
		anime.setTitleEnglish("In Brazil, a lot of people try to save time.");
		anime.setTitleJapanese("ポインター ボックス ボックス ポインター");
		anime.setSynopsis("Lorem Ipsum is simply dummy text of the printing and typesetting industry.");
		anime.setEpisodes(15);

		return anime;
	}

	public static AnimeRecord getAnimeRecord() {
		return AnimeRecord.builder().score(9.6).imageJPG(null).episodes(15).synopsis("Lorem Ipsum is simply dummy text of the printing and typesetting industry.").title("Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.")
				.titleEnglish("In Brazil, a lot of people try to save time.").titleJapanese("ポインター ボックス ボックス ポインター").build();
	}

	
	public static List<Anime> getAnimeList() {
		List<Anime> animes = new ArrayList<>();
		
		animes.add(getAnime());
		
		Anime anime1 = getAnime();
		anime1.setTitleJapanese("コルスの帰還");
		animes.add(anime1);
		
		Anime anime2 = getAnime();
		anime2.setScore(5);
		animes.add(anime2);
		
		Anime anime3 = getAnime();
		anime3.setTitle("Lord of the Rings");
		animes.add(anime3);
		
		Anime anime4 = getAnime();
		anime4.setTitleEnglish("the return of cors");
		animes.add(anime4);
		
		return animes;
	}
	
	public static List<AnimeRecord> getAnimeRecordList() {
		List<AnimeRecord> animes = new ArrayList<>();
		
		animes.add(getAnimeRecord());
		
		AnimeRecord anime1 = getAnimeRecord();
		anime1.setTitleJapanese("コルスの帰還");
		animes.add(anime1);
		
		AnimeRecord anime2 = getAnimeRecord();
		anime2.setScore(5);
		animes.add(anime2);
		
		AnimeRecord anime3 = getAnimeRecord();
		anime3.setTitle("Lord of the Rings");
		animes.add(anime3);
		
		AnimeRecord anime4 = getAnimeRecord();
		anime4.setTitleEnglish("the return of cors");
		animes.add(anime4);
//		
		return animes;
	}
	
}
