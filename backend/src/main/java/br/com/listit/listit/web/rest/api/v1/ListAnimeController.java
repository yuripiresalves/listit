package br.com.listit.listit.web.rest.api.v1;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.listit.listit.domain.entity.TypeList;
import br.com.listit.listit.services.ListAnimeEntityService;
import br.com.listit.listit.web.dto.ListAnimeDTO;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/lists")
@Tag(name = "list", description = "manager lists")
@EnableMethodSecurity(prePostEnabled = true)
@SecurityRequirement(name = "Bearer Authentication")
@AllArgsConstructor
public class ListAnimeController {
	private ListAnimeEntityService listAnimeEntityService;
	
	@PostMapping("/{type}")
	@ApiResponse(responseCode = "200", description = "Found List anime", content = {
			@Content(mediaType = "application/json", schema = @Schema(implementation = ListAnimeDTO.class)) })
	public ResponseEntity<?> createList(@PathVariable("type") String type){
		TypeList valueOf = TypeList.valueOf(type);
		
		ListAnimeDTO createList = listAnimeEntityService.createList(valueOf);
		
		return new ResponseEntity<>(createList, HttpStatus.CREATED);
		
	}

	@GetMapping("/{id}")
	@ApiResponse(responseCode = "200", description = "find List anime by id", content = {
			@Content(mediaType = "application/json", schema = @Schema(implementation = ListAnimeDTO.class)) })
	public ResponseEntity<?> getById(@PathVariable("id") int id){
		ListAnimeDTO byId = listAnimeEntityService.getById(id);
		return ResponseEntity.ok(byId);
	}
	
	@PutMapping("/{idList}/{idAnime}")
	@ApiResponse(responseCode = "200", description = "add anime in List anime by id", content = {
			@Content(mediaType = "application/json", schema = @Schema(implementation = ListAnimeDTO.class)) })
	public ResponseEntity<?> addItem(@PathVariable("idList") int idList,@PathVariable("idAnime") int idAnime) {
		ListAnimeDTO addItem = listAnimeEntityService.addItem(idList, idAnime);
		return ResponseEntity.ok(addItem);
	}
	
	@DeleteMapping("/{idList}/{idAnime}")
	@ApiResponse(responseCode = "200", description = "remove anime in List anime by id", content = {
			@Content(mediaType = "application/json", schema = @Schema(implementation = ListAnimeDTO.class)) })
	public ResponseEntity<?> removeItem(int idList, int idAnime){
		listAnimeEntityService.removeItem(idList, idAnime);
		return ResponseEntity.noContent().build();
	}
}
