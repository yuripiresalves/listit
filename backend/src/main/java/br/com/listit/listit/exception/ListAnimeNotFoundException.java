package br.com.listit.listit.exception;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ResponseStatus;

@Component
@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class ListAnimeNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public ListAnimeNotFoundException() {
		super();
	}

	public ListAnimeNotFoundException(String message) {
		super(message);
	}

	public ListAnimeNotFoundException(Throwable cause) {
		super(cause);
	}

}
