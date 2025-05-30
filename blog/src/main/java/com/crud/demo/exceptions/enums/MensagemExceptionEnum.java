package com.crud.demo.exceptions.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum MensagemExceptionEnum {
    POST_NAO_ENCONTRADO("Post não encontrado."),
    ERRO_INTERNO("Erro interno no servidor.");

    private final String mensagem;
}
