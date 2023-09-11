package com.blogpost.blog.controller;

import com.blogpost.blog.dto.ReactionDTO;
import com.blogpost.blog.service.ReactionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reactions")
public class ReactionController {
    Logger logger= LoggerFactory.getLogger(ReactionController.class);
    @Autowired
    public ReactionService reactionService;
    @PostMapping("/add")
    public ResponseEntity<?> addReaction(@RequestBody ReactionDTO reactionDTO){
        logger.info("add");
        int result= reactionService.addReaction(reactionDTO.getReactionType(),reactionDTO.getPostId());
        if(result==1){
            return ResponseEntity.ok("Reacted successfully");
        }
       else  return ResponseEntity.badRequest().body("Internal Error");
    }
    @PostMapping("/delete")
    public ResponseEntity<?> deleteReaction(@RequestBody ReactionDTO reactionDTO){
        logger.info(reactionDTO.getReactionType());
        logger.info("delete");
        int result= reactionService.deleteReaction(reactionDTO.getReactionType(),reactionDTO.getPostId());
        if(result==1){
            return ResponseEntity.ok("Reacted successfully");
        }
        else  return ResponseEntity.badRequest().body("Internal Error");
    }
}
