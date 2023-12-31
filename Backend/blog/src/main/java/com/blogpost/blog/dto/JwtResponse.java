package com.blogpost.blog.dto;

public class JwtResponse {
    private String token;
    private String type="Bearer";
    private String refreshToken;
    private Long id;
    private String username;
    private String email;
    private int author_id;



    public  JwtResponse(){

    }
    public JwtResponse(String token, String type, String refreshToken,Long id, String username, String email, int author_id) {
        this.token = token;
        this.type = type;
        this.refreshToken=refreshToken;
        this.id = id;
        this.username = username;
        this.email = email;
        this.author_id=author_id;
    }
    public int getAuthor_id() {
        return author_id;
    }

    public void setAuthor_id(int author_id) {
        this.author_id = author_id;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
