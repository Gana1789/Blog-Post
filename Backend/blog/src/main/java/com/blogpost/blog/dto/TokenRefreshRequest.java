package com.blogpost.blog.dto;

import jakarta.validation.constraints.NotBlank;

public class TokenRefreshRequest {

    @NotBlank
    private String refreshToken;

    public  TokenRefreshRequest(){

    }
    public TokenRefreshRequest(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public String getRefreshToken(){
        return refreshToken;
    }
    public void setRefreshToken(String refreshToken){
        this.refreshToken=refreshToken;
    }

}
