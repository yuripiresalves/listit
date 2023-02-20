package br.com.listit.listit.web.rest.handler;

import java.time.LocalDateTime;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.fasterxml.jackson.annotation.JsonFormat;

import br.com.listit.listit.exception.ListAnimeNotFoundException;
import br.com.listit.listit.exception.UserNotFoundException;
import br.com.listit.listit.services.remote.exceptions.BadRequestClientServiceException;
import lombok.Builder;
import lombok.Data;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {
	
	@ExceptionHandler(BadRequestClientServiceException.class)
    public ResponseEntity<BadRequestExceptionDetails> badRequestClientServiceException(BadRequestClientServiceException badRequestException){
        return new ResponseEntity<>(
                BadRequestExceptionDetails.builder()
                .timeStamps(LocalDateTime.now())
                .status(HttpStatus.BAD_REQUEST.value())
                .title("Bad Request Exception, try again")
                .details(badRequestException.getMessage())
                .developerMessge(badRequestException.getClass().getName())
                .build(), HttpStatus.BAD_REQUEST
        );
    }

	@ExceptionHandler(ListAnimeNotFoundException.class)
    public ResponseEntity<BadRequestExceptionDetails> listAnimeNotException(ListAnimeNotFoundException badRequestException){
    
        return new ResponseEntity<>(
                BadRequestExceptionDetails.builder()
                .timeStamps(LocalDateTime.now())
                .status(HttpStatus.NOT_FOUND.value())
                .title("Not found Exception, try again")
                .details(badRequestException.getMessage())
                .developerMessge(badRequestException.getClass().getName())
                .build(), HttpStatus.BAD_REQUEST
        );
    }

	@ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<BadRequestExceptionDetails> userNotFoundException(UserNotFoundException badRequestException){

        return new ResponseEntity<>(
                BadRequestExceptionDetails.builder()
                .timeStamps(LocalDateTime.now())
                .status(HttpStatus.NOT_FOUND.value())
                .title("Not found Exception, try again")
                .details(badRequestException.getMessage())
                .developerMessge(badRequestException.getClass().getName())
                .build(), HttpStatus.BAD_REQUEST
        );
    }
	
  @Override
	protected ResponseEntity<Object> handleExceptionInternal(Exception ex, Object body,
			HttpHeaders headers, HttpStatusCode statusCode, WebRequest request) {
    	return new ResponseEntity<>(
                BadRequestExceptionDetails.builder()
                .timeStamps(LocalDateTime.now())
                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .title("Error Internal")
                .details(ex.getMessage())
                .developerMessge(ex.getClass().getName())
                .build(), HttpStatus.INTERNAL_SERVER_ERROR
        );
	}

	@Builder
	@Data
	private static class BadRequestExceptionDetails{
	    protected String title;
	    protected int status;
	    protected String details;
	    protected String developerMessge;
	    @JsonFormat(pattern = "dd/MM/yyyy hh:mm:ss a")
	    protected LocalDateTime timeStamps;

	}

}
