package com.blogpost.blog.controller;

import com.blogpost.blog.dto.PostDTO;
import com.blogpost.blog.model.Author;
import com.blogpost.blog.model.Post;
import com.blogpost.blog.model.Reactions;
import com.blogpost.blog.repository.AuthorRepository;
import com.blogpost.blog.service.AuthorService;
import com.blogpost.blog.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;


@RestController()
@RequestMapping("/")
public class PostController {
    Logger logger = LoggerFactory.getLogger(PostController.class);

    @Autowired
    public PostService postService;

    @Autowired
    public AuthorService authorService;

    @GetMapping("/posts")

    public ResponseEntity<List<Post>> getPosts(){

        return ResponseEntity.ok(postService.getAllPosts());
    }

    @GetMapping("/posts/{id}")
    public ResponseEntity<Post> getPostByID(@PathVariable long id){
        Optional<Post> post= postService.getPostById(id);
        if(post.isPresent()){
            return  ResponseEntity.ok(post.get());
        }
        else {
            ResponseEntity.BodyBuilder res= ResponseEntity.status(HttpStatus.BAD_REQUEST);
            Post ps=new Post();

            return  res.body(ps);

        }

    }

    @PostMapping(value = "/addPost")
    public ResponseEntity<Post> savePost(@RequestBody PostDTO postDTO){
        Post post=new Post();
        Reactions reactions=new Reactions();
        reactions.setLove(0);
        reactions.setThumbsUp(0);
        LocalDateTime currentDateTime = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSSSSS");
        String creation_Time = currentDateTime.format(formatter);
        //logger.info(creation_Time);
        postDTO.setCreated_time(creation_Time);
        logger.info(String.valueOf(postDTO.getDescription()));
        logger.info(String.valueOf(postDTO.getCreated_time()));
        logger.info(String.valueOf(postDTO.getTitle()));
        logger.info(String.valueOf(postDTO.getAuthor_id()));
        Optional<Author> author=authorService.getAuthor(postDTO.getAuthor_id());
        post.setTitle(postDTO.getTitle());
        post.setDescription(postDTO.getDescription());
        post.setCreated_time(postDTO.getCreated_time());
        post.setReactions(reactions);
         author.ifPresent(post::setAuthor);
        reactions.setPost(post);
//        if(author.isPresent()){
//            author.
//        }
       // System.out.println(post.getAuthor().getAuthor_id());

        postService.savePost(post);
        return ResponseEntity.ok(post);
    }

    @GetMapping("/posts/author/{authorId}")
    public ResponseEntity<List<Post>> getPostsByAuthor(@PathVariable Integer authorId){
        return ResponseEntity.ok(authorService.getPostsByAuthor(authorId));
    }

    @PutMapping("/editPost/{id}")
    public ResponseEntity<String> editPost(@PathVariable Integer id, @RequestBody PostDTO postDTO){
        Optional<Post> post= postService.getPostById(id);
        if(post.isPresent()){
            post.get().setTitle(postDTO.getTitle());
            post.get().setDescription(postDTO.getDescription());
            post.get().setCreated_time(postDTO.getCreated_time());
            postService.savePost(post.get());
            return ResponseEntity.ok("Successfully updated");

        }
        return null;

    }

    @DeleteMapping("/deletePost/{id}")
    public ResponseEntity<String> deletePost(@PathVariable Long id){
        postService.deletePost(id);
        return ResponseEntity.ok("Deleted Successfully");
    }

}
