package com.blogpost.blog.advice;

import com.blogpost.blog.exception.TokenRefreshException;
import io.jsonwebtoken.JwtException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;

@RestControllerAdvice
public class TokenControllerAdvice {

    @ExceptionHandler(value = TokenRefreshException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ErrorMessage handleTokenRefreshException(TokenRefreshException ex, WebRequest request){
        return new ErrorMessage(HttpStatus.FORBIDDEN.value(),new Date(),
                ex.getMessage(),request.getDescription(false));
    }

    @ExceptionHandler(value = JwtException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ErrorMessage handleJwtException(JwtException ex,WebRequest request){
        return new ErrorMessage(HttpStatus.FORBIDDEN.value(),new Date(),ex.getMessage(),request.getDescription(false));
    }
}
