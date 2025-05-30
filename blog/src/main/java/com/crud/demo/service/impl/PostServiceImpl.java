package com.crud.demo.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.crud.demo.domain.Post;
import com.crud.demo.exceptions.posts.PostNaoEncontradoException;
import com.crud.demo.repositories.PostRepository;
import com.crud.demo.service.PostService;
import com.crud.demo.service.dto.posts.PostRequestDTO;
import com.crud.demo.service.dto.posts.PostResponseDTO;
import com.crud.demo.service.mappers.PostMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService{

    private final PostRepository postRepository;
    private final PostMapper postMapper;

    @Override
    public PostResponseDTO cadastrarPost(PostRequestDTO postRequestDTO) {
        Post postEntity = postMapper.toEntity(postRequestDTO);
        Post postSalvo = postRepository.save(postEntity);
        return postMapper.toDTO(postSalvo);

    }

    @Override
    public PostResponseDTO buscarPostPorId(Long id) {
        Post Post = postRepository.findById(id)
                .orElseThrow(() -> new PostNaoEncontradoException());
        return postMapper.toDTO(Post);
    }
    @Override
    public Page<PostResponseDTO> listarTodosPosts(int page, int size, String sortBy, String direction) {
        Sort sort = direction.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        int pageIndex = page < 1 ? 0 : page - 1;
        Pageable pageable = PageRequest.of(pageIndex, size, sort);
        Page<Post> postsEncontrados = postRepository.findAll(pageable);
        return postsEncontrados.map(postMapper::toDTO);
    }

    @Override
    public PostResponseDTO atualizarPost(Long id, PostRequestDTO request) {
        Post postAtualizar = postRepository.findById(id).orElseThrow(() -> new PostNaoEncontradoException());
        postAtualizar.setTitulo(request.getTitulo());
        postAtualizar.setAutor(request.getAutor());
        postAtualizar.setLinkImagem(request.getLinkImagem());
        postAtualizar.setConteudo(request.getConteudo());
        Post postAtualizado = postRepository.save(postAtualizar);
        return postMapper.toDTO(postAtualizado);
    }

    @Override
    public void deletarPost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new PostNaoEncontradoException());
        postRepository.delete(post);
    }
}
