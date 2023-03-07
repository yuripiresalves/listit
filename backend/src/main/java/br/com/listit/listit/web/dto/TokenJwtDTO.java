package br.com.listit.listit.web.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class TokenJwtDTO {
	private String token;

    @JsonFormat(pattern = "dd-MM-yyyy hh:mm:ss")
	private LocalDateTime expire;
}
