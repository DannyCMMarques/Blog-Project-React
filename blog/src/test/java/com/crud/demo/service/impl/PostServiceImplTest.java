package com.crud.demo.service.impl;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import com.crud.demo.domain.Post;
import com.crud.demo.exceptions.posts.PostNaoEncontradoException;
import com.crud.demo.repositories.PostRepository;
import com.crud.demo.service.dto.posts.PostRequestDTO;
import com.crud.demo.service.dto.posts.PostResponseDTO;
import com.crud.demo.service.mappers.PostMapper;

@ExtendWith(MockitoExtension.class)
@DisplayName("Testes unitários do PostServiceImpl")
class PostServiceImplTest {

    @Mock
    private PostRepository postRepository;

    @Mock
    private PostMapper postMapper;

    @InjectMocks
    private PostServiceImpl postService;

    private PostRequestDTO postRequest;
    private Post postEntity;
    private PostResponseDTO postResponse;

    @BeforeEach
    void setUp() {
        postRequest = new PostRequestDTO();
        postRequest.setTitulo("Título Exemplo");
        postRequest.setAutor("Autor Exemplo");
        postRequest.setLinkImagem("http://img.exemplo");
        postRequest.setConteudo("Conteúdo Exemplo");

        postEntity = new Post();
        postEntity.setId(1L);
        postEntity.setTitulo(postRequest.getTitulo());
        postEntity.setAutor(postRequest.getAutor());
        postEntity.setLinkImagem(postRequest.getLinkImagem());
        postEntity.setConteudo(postRequest.getConteudo());

        postResponse = PostResponseDTO.builder()
                .id(1L)
                .titulo(postRequest.getTitulo())
                .autor(postRequest.getAutor())
                .build();
    }

    @Test
    @DisplayName("Deve cadastrar post com sucesso")
    void deveCadastrarPost() {
        when(postMapper.toEntity(postRequest)).thenReturn(postEntity);
        when(postRepository.save(postEntity)).thenReturn(postEntity);
        when(postMapper.toDTO(postEntity)).thenReturn(postResponse);

        PostResponseDTO resultado = postService.cadastrarPost(postRequest);

        assertEquals(1L, resultado.getId());
        assertEquals("Título Exemplo", resultado.getTitulo());
    }

    @Test
    @DisplayName("Deve buscar post por ID com sucesso")
    void deveBuscarPostPorId() {
        when(postRepository.findById(1L)).thenReturn(Optional.of(postEntity));
        when(postMapper.toDTO(postEntity)).thenReturn(postResponse);

        PostResponseDTO resultado = postService.buscarPostPorId(1L);

        assertEquals("Autor Exemplo", resultado.getAutor());
    }

    @Test
    @DisplayName("Deve lançar exceção ao buscar post inexistente")
    void deveLancarExcecaoAoBuscarPostInexistente() {
        when(postRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(PostNaoEncontradoException.class,
            () -> postService.buscarPostPorId(99L));
    }

    @Test
    @DisplayName("Deve listar todos os posts")
    void deveListarTodosPosts() {
        PageImpl<Post> page = new PageImpl<>(List.of(postEntity));
        when(postRepository.findAll(any(Pageable.class))).thenReturn(page);
        when(postMapper.toDTO(postEntity)).thenReturn(postResponse);

        Page<PostResponseDTO> resultado = postService.listarTodosPosts(1, 10, "id", "asc");

        assertEquals(1, resultado.getTotalElements());
        assertEquals("Título Exemplo", resultado.getContent().get(0).getTitulo());
    }

    @Test
    @DisplayName("Deve atualizar post com sucesso")
    void deveAtualizarPost() {
        PostRequestDTO updateReq = new PostRequestDTO();
        updateReq.setTitulo("Título Atualizado");
        updateReq.setAutor("Autor Atualizado");
        updateReq.setLinkImagem("http://img.atualizada");
        updateReq.setConteudo("Conteúdo Atualizado");

        Post updatedEntity = new Post();
        updatedEntity.setId(1L);
        updatedEntity.setTitulo(updateReq.getTitulo());
        updatedEntity.setAutor(updateReq.getAutor());
        updatedEntity.setLinkImagem(updateReq.getLinkImagem());
        updatedEntity.setConteudo(updateReq.getConteudo());

        PostResponseDTO updatedResponse = PostResponseDTO.builder()
                .id(1L)
                .titulo(updateReq.getTitulo())
                .autor(updateReq.getAutor())
                .build();

        when(postRepository.findById(1L)).thenReturn(Optional.of(postEntity));
        when(postRepository.save(any(Post.class))).thenReturn(updatedEntity);
        when(postMapper.toDTO(updatedEntity)).thenReturn(updatedResponse);

        PostResponseDTO resultado = postService.atualizarPost(1L, updateReq);

        assertEquals("Título Atualizado", resultado.getTitulo());
        assertEquals("Autor Atualizado", resultado.getAutor());
    }

    @Test
    @DisplayName("Deve lançar exceção ao atualizar post inexistente")
    void deveLancarExcecaoAoAtualizarPostInexistente() {
        when(postRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(PostNaoEncontradoException.class,
            () -> postService.atualizarPost(99L, postRequest));
    }

    @Test
    @DisplayName("Deve deletar post com sucesso")
    void deveDeletarPost() {
        when(postRepository.findById(1L)).thenReturn(Optional.of(postEntity));

        assertDoesNotThrow(() -> postService.deletarPost(1L));
        verify(postRepository, times(1)).delete(postEntity);
    }

    @Test
    @DisplayName("Deve lançar exceção ao deletar post inexistente")
    void deveLancarExcecaoAoDeletarPostInexistente() {
        when(postRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(PostNaoEncontradoException.class,
            () -> postService.deletarPost(99L));
    }
}
