package com.blogpost.blog.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "authors")
public class Author {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer author_id;



    private String author_name;

    private String email;


    private String author_creation;

    @OneToMany(mappedBy = "author", cascade = {CascadeType.ALL})
    @JsonBackReference
    //@JsonIgnoreProperties("author")
    private List<Post> posts;
    public Author(){

    }

    public Author(Integer author_id, String author_name, String email, String author_creation, List<Post> posts) {
        this.author_id = author_id;
        this.author_name = author_name;
        this.email = email;
        this.author_creation = author_creation;
        this.posts = posts;
    }

    public Integer getAuthor_id() {
        return author_id;
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

    public void setAuthor_id(Integer author_id) {
        this.author_id = author_id;
    }

    public List<Post> getPosts() {
        return posts;
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }
}
