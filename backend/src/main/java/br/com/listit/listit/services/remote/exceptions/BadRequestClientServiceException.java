package br.com.listit.listit.services.remote.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ResponseStatus;

@Component
@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class BadRequestClientServiceException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public BadRequestClientServiceException() {
		super();
	}

	public BadRequestClientServiceException(String message) {
		super(message);
	}

	public BadRequestClientServiceException(Throwable cause) {
		super(cause);
	}

}
