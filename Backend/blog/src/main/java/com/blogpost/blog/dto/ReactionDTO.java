package com.blogpost.blog.dto;

public class ReactionDTO {

    Long postId;
    String reactionType;

    public  ReactionDTO(){

    }

    public ReactionDTO(Long postId, String reactionType) {
        this.postId = postId;
        this.reactionType = reactionType;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public String getReactionType() {
        return reactionType;
    }

    public void setReactionType(String reactionType) {
        this.reactionType = reactionType;
    }
}
