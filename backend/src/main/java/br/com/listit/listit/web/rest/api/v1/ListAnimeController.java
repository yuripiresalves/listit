package br.com.listit.listit.web.rest.api.v1;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.listit.listit.domain.entity.TypeList;
import br.com.listit.listit.services.anime.ListAnimeEntityService;
import br.com.listit.listit.web.dto.ListAnimeDTO;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@CrossOrigin
@RequestMapping("/api/lists")
@Tag(name = "list", description = "manager lists")
@AllArgsConstructor
@Log4j2
public class ListAnimeController {
	private ListAnimeEntityService listAnimeEntityService;

	@PostMapping("/create")
	@SecurityRequirement(name = "Bearer Authentication")
	@ApiResponse(responseCode = "201", description = "Created all List anime", content = {
			@Content(mediaType = "application/json", schema = @Schema(implementation = ListAnimeDTO.class)) })
	public ResponseEntity<?> createAllList() {
		log.info("tá chamando confia");
		List<ListAnimeDTO> createAllList = listAnimeEntityService.createAllList();

		return new ResponseEntity<>(createAllList, HttpStatus.CREATED);

	}

	@GetMapping
	@SecurityRequirement(name = "Bearer Authentication")
	@ApiResponse(responseCode = "200", description = "find List anime by id", content = {
			@Content(mediaType = "application/json", schema = @Schema(implementation = ListAnimeDTO.class)) })
	public ResponseEntity<?> getAll() {
		List<ListAnimeDTO> allLists = listAnimeEntityService.getAll();
		return ResponseEntity.ok(allLists);
	}
	
	@GetMapping("/types")
	@SecurityRequirement(name = "Bearer Authentication")
	@ApiResponse(responseCode = "200", description = "find List anime by id", content = {
			@Content(mediaType = "application/json", schema = @Schema(implementation = TypeList.class)) })
	public ResponseEntity<?> getAllTypeLists() {
		return ResponseEntity.ok(TypeList.values());
	}

	@GetMapping("/{type}")
	@SecurityRequirement(name = "Bearer Authentication")
	@ApiResponse(responseCode = "200", description = "find List anime by id", content = {
			@Content(mediaType = "application/json", schema = @Schema(implementation = ListAnimeDTO.class)) })
	public ResponseEntity<?> getById(@PathVariable("type") String type) {
		ListAnimeDTO byId = listAnimeEntityService.getByTypeList(TypeList.valueOf(type));
		return ResponseEntity.ok(byId);
	}

	@PutMapping("/add/{type}/{idAnime}")
	@SecurityRequirement(name = "Bearer Authentication")
	@ApiResponse(responseCode = "200", description = "add anime in List anime by id", content = {
			@Content(mediaType = "application/json", schema = @Schema(implementation = ListAnimeDTO.class)) })
	public ResponseEntity<?> addItem(@PathVariable("type") String type, @PathVariable("idAnime") int idAnime) {
		ListAnimeDTO addItem = listAnimeEntityService.addItem(TypeList.valueOf(type), idAnime);
		return ResponseEntity.ok(addItem);
	}

	@PutMapping("/favorite/{idAnime}")
	@SecurityRequirement(name = "Bearer Authentication")
	@ApiResponse(responseCode = "200", description = "add anime in List Favorite anime by id", content = {
			@Content(mediaType = "application/json", schema = @Schema(implementation = ListAnimeDTO.class)) })
	public ResponseEntity<?> addItemInFavorite(@PathVariable("idAnime") int idAnime) {
		ListAnimeDTO addItem = listAnimeEntityService.addItemFavorite(idAnime);
		return ResponseEntity.ok(addItem);
	}

	@DeleteMapping("/{idList}/{idAnime}")
	@SecurityRequirement(name = "Bearer Authentication")
	@ApiResponse(responseCode = "200", description = "remove anime in List anime by id", content = {
			@Content(mediaType = "application/json", schema = @Schema(implementation = ListAnimeDTO.class)) })
	public ResponseEntity<?> removeItem(int idList, int idAnime) {
		listAnimeEntityService.removeItem(idList, idAnime);
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/findByUsername/{username}")
	@SecurityRequirement(name = "Bearer Authentication")
	@ApiResponse(responseCode = "200", description = "find List anime by id", content = {
			@Content(mediaType = "application/json", schema = @Schema(implementation = ListAnimeDTO.class)) })
	public ResponseEntity<?> getAllListsById(@PathVariable("username") String username) {
		List<ListAnimeDTO> allLists = listAnimeEntityService.getAllListsByUsername(username);
		return ResponseEntity.ok(allLists);
	}

}
