package com.crud.demo.service;

import org.springframework.data.domain.Page;

import com.crud.demo.service.dto.posts.PostRequestDTO;
import com.crud.demo.service.dto.posts.PostResponseDTO;

public interface PostService {
    PostResponseDTO cadastrarPost(PostRequestDTO postRequestDTO);

    PostResponseDTO buscarPostPorId(Long id);

    Page<PostResponseDTO> listarTodosPosts(int page, int size, String sortBy, String direction);

    PostResponseDTO atualizarPost(Long id, PostRequestDTO request);

    void deletarPost(Long id);
}
