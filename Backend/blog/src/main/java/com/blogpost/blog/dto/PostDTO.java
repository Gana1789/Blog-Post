package com.blogpost.blog.dto;

import com.blogpost.blog.model.Author;

public class PostDTO {
    private String title;
    private String description;
    private String created_time;

    private Integer  author_id;

    public PostDTO(String title, String description, String created_time, Integer author_id) {
        this.title = title;
        this.description = description;
        this.created_time = created_time;
        this.author_id = author_id;
    }
    public PostDTO(){

    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCreated_time() {
        return created_time;
    }

    public void setCreated_time(String created_time) {
        this.created_time = created_time;
    }

    public Integer getAuthor_Id() {
        return author_id;
    }

    public void setAuthor_Id(Integer author_id) {
        this.author_id = author_id;
    }
}
