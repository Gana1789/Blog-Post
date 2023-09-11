package com.blogpost.blog.service;

import com.blogpost.blog.model.Reactions;
import com.blogpost.blog.repository.PostRepository;
import com.blogpost.blog.repository.ReactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ReactionService {

    @Autowired
    public ReactionRepository reactionRepository;
    @Autowired
    public PostRepository postRepository;
    public int addReaction(String reactionType, long post_id){
        Optional<Reactions> reactions= reactionRepository.findByPost(postRepository.findById(post_id).get());
        if(reactions.isPresent()){
            if(reactionType.equals("thumbsUp")){
                reactions.get().setThumbsUp(1);
            }
            else {
                reactions.get().setLove(1);
            }
            reactionRepository.save(reactions.get());
        }
        return 1;
    }
    public int deleteReaction(String reactionType, long post_id){

        Optional<Reactions> reactions= reactionRepository.findByPost(postRepository.findById(post_id).get());
        if(reactions.isPresent()){
            if(reactionType.equals("thumbsUp")){
                reactions.get().setThumbsUp(0);
            }
            else {
                reactions.get().setLove(0);
            }
            reactionRepository.save(reactions.get());
        }
        return 1;
    }

}
