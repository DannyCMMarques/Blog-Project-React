package com.crud.demo.domain;

import java.time.LocalDateTime;
import java.time.ZoneId;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O titulo é obrigatório")
    private String titulo;

    @NotBlank(message = "O Autor é obrigatório")
    private String autor;

    @NotBlank(message = "O Link da Imagem é obrigatório")
    private String linkImagem;

    @NotBlank(message = "O conteúdo é obrigatório")
    private String conteudo;

    private LocalDateTime create_at = LocalDateTime.now(ZoneId.of("America/Sao_Paulo"));


}
