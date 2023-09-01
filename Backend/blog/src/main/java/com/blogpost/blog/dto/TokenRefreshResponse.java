package com.blogpost.blog.dto;

public class TokenRefreshResponse {
    private String accessToken;
    private String refreshToken;
    private String tokenType="Bearer";

    public TokenRefreshResponse(String accessToken,String refreshToken){
        this.refreshToken=refreshToken;
        this.accessToken=accessToken;
    }
    public  TokenRefreshResponse(){

    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }
}
