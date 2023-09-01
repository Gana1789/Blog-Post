package com.blogpost.blog.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class TokenRefreshException extends RuntimeException{

String message;
String token;
public TokenRefreshException(String token,String message){
    super("Failed for [%s]:%s".formatted(token, message));
}
}
