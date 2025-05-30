package com.crud.demo.web.rest;

import java.net.URI;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.crud.demo.service.PostService;
import com.crud.demo.service.dto.posts.PostRequestDTO;
import com.crud.demo.service.dto.posts.PostResponseDTO;
import com.crud.demo.web.rest.utils.UriLocationUtils;
import com.crud.demo.web.rest.utils.annotations.DeleteSwaggerAnnotation;
import com.crud.demo.web.rest.utils.annotations.GetSwaggerAnnotation;
import com.crud.demo.web.rest.utils.annotations.PostSwaggerAnnotation;
import com.crud.demo.web.rest.utils.annotations.PutSwaggerAnnotation;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Tag(name = "Posts", description = "Endpoints para operações com posts")
public class PostController {

    private final PostService postService;

    @PostMapping
    @Operation(summary = "Cadastrar um post")
    @PostSwaggerAnnotation
    public ResponseEntity<PostResponseDTO> criarPost(
            @Valid @RequestBody PostRequestDTO postRequestDTO) {
        PostResponseDTO criado = postService.cadastrarPost(postRequestDTO);
        URI location = UriLocationUtils.criarLocationUri("api/v1/posts", criado.getId());
        return ResponseEntity.created(location).body(criado);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar post por ID")
    @GetSwaggerAnnotation
    public ResponseEntity<PostResponseDTO> buscarPorId(@PathVariable Long id) {
        PostResponseDTO dto = postService.buscarPostPorId(id);
        return ResponseEntity.ok(dto);
    }

    @GetMapping
    @Operation(summary = "Listar posts com paginação")
    @GetSwaggerAnnotation
    public ResponseEntity<Page<PostResponseDTO>> listar(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {

        Page<PostResponseDTO> pagina = postService.listarTodosPosts(page, size, sortBy, direction);
        return ResponseEntity.ok(pagina);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar um post")
    @PutSwaggerAnnotation
    public ResponseEntity<PostResponseDTO> atualizar(
            @PathVariable Long id,
            @Valid @RequestBody PostRequestDTO postRequestDTO) {
        PostResponseDTO atualizado = postService.atualizarPost(id, postRequestDTO);
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar um post")
    @DeleteSwaggerAnnotation
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        postService.deletarPost(id);
        return ResponseEntity.noContent().build();
    }
}
