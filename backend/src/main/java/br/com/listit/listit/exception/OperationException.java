package br.com.listit.listit.exception;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ResponseStatus;

@Component
@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class OperationException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	public OperationException() {
		super();
		// TODO Auto-generated constructor stub
	}

	public OperationException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

	public OperationException(Throwable cause) {
		super(cause);
		// TODO Auto-generated constructor stub
	}

}
