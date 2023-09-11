package com.blogpost.blog.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class JwtException extends RuntimeException {
    String message;

    public JwtException(String message){
        super();
    }
}
