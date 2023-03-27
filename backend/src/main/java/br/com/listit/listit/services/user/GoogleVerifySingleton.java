package br.com.listit.listit.services.user;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Value;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;

public class GoogleVerifySingleton {
	private static GoogleIdTokenVerifier verifier = null;

	private static String idClientGoogle;
	
	public  GoogleIdTokenVerifier getGoogleIdTokenVerifier() {
		if(verifier == null) {
			verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
					.setAudience(Collections.singletonList(idClientGoogle)).build();

		}
		
		return verifier;
	}
	
	public static String getIdClientGoogle() {
		return idClientGoogle;
	}

	@Value("${google.id-cliente}")
	private void setIdClientGoogle(String idClientGoogle) {
		GoogleVerifySingleton.idClientGoogle = idClientGoogle;
	}
}
