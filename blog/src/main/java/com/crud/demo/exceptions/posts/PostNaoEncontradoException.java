package com.crud.demo.exceptions.posts;

import org.springframework.http.HttpStatus;

import com.crud.demo.exceptions.ApiException;
import com.crud.demo.exceptions.enums.MensagemExceptionEnum;

public class PostNaoEncontradoException extends ApiException {
public PostNaoEncontradoException(){
super(MensagemExceptionEnum.POST_NAO_ENCONTRADO.getMensagem(),HttpStatus.NOT_FOUND);
}
}
