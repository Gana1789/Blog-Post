package com.blogpost.blog.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDateTime;



@Entity
@Table(name = "posts")
public class Post {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long post_id;


  private String title;

  private String description;

  private String created_time;


  @ManyToOne
  @JoinColumn(name = "author_id")
  @JsonManagedReference
  //@JsonIgnore
  private Author author;

  public Post() {

  }

  public Post(Long post_id, String title, String description, String created_time, Author author) {
    this.post_id = post_id;
    this.title = title;
    this.description = description;
    this.created_time = created_time;
    this.author = author;
  }

  public Long getPost_id() {
    return post_id;
  }

  public String getTitle() {
    return title;
  }

  public String getDescription() {
    return description;
  }

  public String getCreated_time() {
    return created_time;
  }

  public Author getAuthor() {
    return author;
  }



  public void setTitle(String title) {
    this.title = title;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public void setCreated_time(String created_time) {
    this.created_time = created_time;
  }

  public void setAuthor(Author author) {
    this.author = author;
  }
}
