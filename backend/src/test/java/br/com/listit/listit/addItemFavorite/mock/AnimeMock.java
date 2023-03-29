package br.com.listit.listit.addItemFavorite.mock;

import br.com.listit.listit.web.dto.AnimeRecord;

public class AnimeMock {
	public static AnimeRecord getAnimeRecord() {
		AnimeRecord animeRecord = new AnimeRecord();
		
		animeRecord.setId(1);
		animeRecord.setEpisodes(11);
		animeRecord.setScore(23);
		animeRecord.setSynopsis("synops");
		animeRecord.setTitle("algum title");
		animeRecord.setTitleEnglish("ewewwecx");
		animeRecord.setTitleJapanese("japan");
		
		return animeRecord;
	}
}
