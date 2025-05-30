package com.crud.demo.web.rest;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.crud.demo.exceptions.GlobalExceptionHandler;
import com.crud.demo.exceptions.posts.PostNaoEncontradoException;
import com.crud.demo.service.dto.posts.PostRequestDTO;
import com.crud.demo.service.dto.posts.PostResponseDTO;
import com.crud.demo.service.impl.PostServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(PostController.class)
@Import(GlobalExceptionHandler.class)
class PostControllerIntegrationTest {

        @Autowired
        private MockMvc mockMvc;

        @MockBean
        private PostServiceImpl postService;

        @Autowired
        private ObjectMapper objectMapper;

        private PostRequestDTO postRequest;
        private PostResponseDTO postResponse;

        @BeforeEach
        void setUp() {
                postRequest = new PostRequestDTO();
                postRequest.setTitulo("Título Exemplo");
                postRequest.setAutor("Autor Exemplo");
                postRequest.setLinkImagem("http://img.exemplo");
                postRequest.setConteudo("Conteúdo Exemplo");

                postResponse = PostResponseDTO.builder()
                                .id(1L)
                                .titulo(postRequest.getTitulo())
                                .autor(postRequest.getAutor())
                                .build();
        }

        @Test
        @DisplayName("Deve cadastrar post e retornar 201 Created")
        void deveCadastrarPostComSucesso() throws Exception {
                when(postService.cadastrarPost(any(PostRequestDTO.class)))
                                .thenReturn(postResponse);

                mockMvc.perform(post("/api/v1/posts")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(postRequest)))
                                .andExpect(status().isCreated())
                                .andExpect(header().string("Location", "http://localhost/api/v1/posts/1"))
                                .andExpect(jsonPath("$.id").value(1L))
                                .andExpect(jsonPath("$.titulo").value("Título Exemplo"));

                verify(postService).cadastrarPost(any(PostRequestDTO.class));
        }

        @Test
        @DisplayName("Deve retornar 400 Bad Request ao cadastrar post com dados inválidos")
        void deveRetornarErroCadastrarPostComDadosInvalidos() throws Exception {
                PostRequestDTO invalido = new PostRequestDTO();
                mockMvc.perform(post("/api/v1/posts")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(invalido)))
                                .andExpect(status().isBadRequest());

                verifyNoInteractions(postService);
        }

        @Test
        @DisplayName("Deve buscar post por ID e retornar 200 OK")
        void deveBuscarPostPorIdSucesso() throws Exception {
                when(postService.buscarPostPorId(1L)).thenReturn(postResponse);

                mockMvc.perform(get("/api/v1/posts/1"))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.id").value(1L))
                                .andExpect(jsonPath("$.titulo").value("Título Exemplo"));

                verify(postService).buscarPostPorId(1L);
        }

        @Test
        @DisplayName("Deve retornar 404 Not Found ao buscar post inexistente")
        void deveRetornar404AoBuscarPostInexistente() throws Exception {
                when(postService.buscarPostPorId(99L))
                                .thenThrow(new PostNaoEncontradoException());

                mockMvc.perform(get("/api/v1/posts/99"))
                                .andExpect(status().isNotFound());

                verify(postService).buscarPostPorId(99L);
        }

        @Test
        @DisplayName("Deve listar posts com paginação e retornar 200 OK")
        void deveListarPostsComPaginacaoSucesso() throws Exception {
                var page = new PageImpl<>(
                                List.of(postResponse),
                                PageRequest.of(0, 10),
                                1);

                when(postService.listarTodosPosts(
                                eq(1), eq(10), eq("titulo"), eq("asc")))
                                .thenReturn(page);

                mockMvc.perform(get("/api/v1/posts?page=1&size=10&sortBy=titulo&direction=asc"))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.content[0].titulo").value("Título Exemplo"));

                verify(postService).listarTodosPosts(1, 10, "titulo", "asc");
        }

        @Test
        @DisplayName("Deve atualizar post e retornar 200 OK")
        void deveAtualizarPostERetornar200() throws Exception {
                PostRequestDTO updateReq = new PostRequestDTO();
                updateReq.setTitulo("Título Atualizado");
                updateReq.setAutor("Autor Atualizado");
                updateReq.setLinkImagem("http://img.atualizada");
                updateReq.setConteudo("Conteúdo Atualizado");

                PostResponseDTO updatedResponse = PostResponseDTO.builder()
                                .id(1L)
                                .titulo("Título Atualizado")
                                .autor("Autor Atualizado")
                                .build();

                when(postService.atualizarPost(eq(1L), any(PostRequestDTO.class)))
                                .thenReturn(updatedResponse);

                mockMvc.perform(put("/api/v1/posts/1")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(updateReq)))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.id").value(1L))
                                .andExpect(jsonPath("$.titulo").value("Título Atualizado"));

                verify(postService).atualizarPost(eq(1L), any(PostRequestDTO.class));
        }

        @Test
        @DisplayName("Deve deletar post e retornar 204 No Content")
        void deveDeletarPostComSucesso() throws Exception {
                mockMvc.perform(delete("/api/v1/posts/1"))
                                .andExpect(status().isNoContent());

                verify(postService).deletarPost(1L);
        }

        @Test
        @DisplayName("Deve retornar 404 ao tentar deletar post inexistente")
        void deveFalharAoDeletarPostInexistente() throws Exception {
                doThrow(new PostNaoEncontradoException())
                                .when(postService).deletarPost(99L);

                mockMvc.perform(delete("/api/v1/posts/99"))
                                .andExpect(status().isNotFound());
        }
}
