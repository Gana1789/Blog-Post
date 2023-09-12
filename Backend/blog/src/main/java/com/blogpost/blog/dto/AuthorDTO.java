package com.blogpost.blog.dto;

public class AuthorDTO {


    Integer author_id;
    String author_name;
    String email;
    String author_creation;

    public AuthorDTO(Integer author_id, String author_name, String email, String author_creation) {
        this.author_id = author_id;
        this.author_name = author_name;
        this.email = email;
        this.author_creation = author_creation;
    }

    public AuthorDTO(){

    }

    public Integer getAuthor_id() {
        return author_id;
    }

    public void setAuthor_id(Integer author_id) {
        this.author_id = author_id;
    }

    public String getAuthor_name() {
        return author_name;
    }

    public void setAuthor_name(String author_name) {
        this.author_name = author_name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAuthor_creation() {
        return author_creation;
    }

    public void setAuthor_creation(String author_creation) {
        this.author_creation = author_creation;
    }
}
