package com.blogpost.blog.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "Reactions")
public class Reactions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int idReactions;

    @Column(name = "ThumbsUp")
    int thumbsUp;

    @Column(name = "Love")
    int love;

    @OneToOne(cascade=CascadeType.ALL)
    @JoinColumn(name = "post_id")
    @JsonBackReference
    Post post;
    public  Reactions(){

    }
    public Reactions(int idReactions, int thumbsUp, int love, Post post) {
        this.idReactions = idReactions;
        this.thumbsUp = thumbsUp;
        this.love = love;
        this.post = post;
    }

    public int getIdReactions() {
        return idReactions;
    }

    public void setIdReactions(int idReactions) {
        this.idReactions = idReactions;
    }

    public int getThumbsUp() {
        return thumbsUp;
    }

    public void setThumbsUp(int thumbsUp) {
        this.thumbsUp = thumbsUp;
    }

    public int getLove() {
        return love;
    }

    public void setLove(int love) {
        this.love = love;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }
}
