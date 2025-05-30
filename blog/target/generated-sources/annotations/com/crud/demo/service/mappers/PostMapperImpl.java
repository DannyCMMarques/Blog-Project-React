package com.crud.demo.service.mappers;

import com.crud.demo.domain.Post;
import com.crud.demo.service.dto.posts.PostRequestDTO;
import com.crud.demo.service.dto.posts.PostResponseDTO;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-30T09:00:58-0300",
    comments = "version: 1.6.3, compiler: Eclipse JDT (IDE) 3.42.0.v20250514-1000, environment: Java 21.0.7 (Eclipse Adoptium)"
)
@Component
public class PostMapperImpl implements PostMapper {

    @Override
    public Post toEntity(PostRequestDTO postRequestDTO) {
        if ( postRequestDTO == null ) {
            return null;
        }

        Post post = new Post();

        post.setAutor( postRequestDTO.getAutor() );
        post.setConteudo( postRequestDTO.getConteudo() );
        post.setLinkImagem( postRequestDTO.getLinkImagem() );
        post.setTitulo( postRequestDTO.getTitulo() );

        return post;
    }

    @Override
    public PostResponseDTO toDTO(Post post) {
        if ( post == null ) {
            return null;
        }

        PostResponseDTO.PostResponseDTOBuilder postResponseDTO = PostResponseDTO.builder();

        postResponseDTO.autor( post.getAutor() );
        postResponseDTO.conteudo( post.getConteudo() );
        postResponseDTO.id( post.getId() );
        postResponseDTO.linkImagem( post.getLinkImagem() );
        postResponseDTO.titulo( post.getTitulo() );

        postResponseDTO.horarioFormatado( formatarHorario(post.getCreate_at()) );

        return postResponseDTO.build();
    }
}
