package com.crud.demo.service.mappers;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.crud.demo.domain.Post;
import com.crud.demo.service.dto.posts.PostRequestDTO;
import com.crud.demo.service.dto.posts.PostResponseDTO;

@Mapper(componentModel = "spring")
public interface PostMapper {

    Post toEntity(PostRequestDTO postRequestDTO);

    @Mapping(target = "horarioFormatado", expression = "java(formatarHorario(post.getCreate_at()))")
    PostResponseDTO toDTO(Post post);

    // Post toEntity(PostResponseDTO postResponseDTO);

    default String formatarHorario(LocalDateTime horario) {
        DateTimeFormatter horarioFormatado = DateTimeFormatter
                .ofPattern("d 'de' MMMM 'às' HH:mm", new Locale("pt", "BR"));
        return horario.format(horarioFormatado);
    }
}
