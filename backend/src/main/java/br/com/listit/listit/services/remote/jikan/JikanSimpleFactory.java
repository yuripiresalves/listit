package br.com.listit.listit.services.remote.jikan;

import net.sandrohc.jikan.Jikan;

public class JikanSimpleFactory {
	private static Jikan JINKAN = null;
	
	public static synchronized Jikan createJikan(){
		if(JINKAN == null) {
			JINKAN = new Jikan.JikanBuilder()
			        .cache(JikanCacheImpl.createJikanCache())
			        .build();
		}

		return JINKAN;
	}

	public static void initialzrService(){
		createJikan();
	}
	
	
}
