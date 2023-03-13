package br.com.listit.listit.web.rest.api.v1;

import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.listit.listit.services.anime.AnimeService;
import br.com.listit.listit.web.dto.AnimeRecord;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/animes")
@Tag(name = "anime", description = "manager animes")
@EnableMethodSecurity(prePostEnabled = true)
@AllArgsConstructor
public class AnimeController {
	private AnimeService animeService;

	@Operation(description = "search a Anime by id")
	@ApiResponse(responseCode = "200", description = "Found the Anime", content = {
			@Content(mediaType = "application/json", schema = @Schema(implementation = AnimeRecord.class)) })
	@GetMapping("/findById/{id}")
	public ResponseEntity<?> findById(@PathVariable("id") int id) {

		return ResponseEntity.ok(animeService.findAnimeByID(id));
  }
  
	@Operation(description = "search a Anime by name")
	@ApiResponse(responseCode = "200", description = "Found the Anime", content = {
			@Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = AnimeRecord.class))) })
	@GetMapping("/findByName/{name}")
	public ResponseEntity<?> findById(@PathVariable("name") String name) {

		return ResponseEntity.ok(animeService.findAnimeByTitle(name));
	}
}
