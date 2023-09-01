package com.blogpost.blog.controller;

import com.blogpost.blog.dto.AuthorDTO;
import com.blogpost.blog.model.Author;
import com.blogpost.blog.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
@RestController
@RequestMapping("/author")
public class AuthorController {
    Logger logger = LoggerFactory.getLogger(AuthorController.class);
    @Autowired
    public AuthorService authorService;

    @GetMapping("/details/{id}")
    public ResponseEntity<Optional<Author>> getAuthorDetails(@PathVariable int id){
        logger.info(String.valueOf(id));
        Optional<Author> author=authorService.getAuthor(id);

        if(author.isPresent()) {
            logger.info(String.valueOf(author.get().getPosts().get(0).getTitle()));
            return  ResponseEntity.ok(author);
        }
        return null;
    }

    @GetMapping("/authorList")
    public ResponseEntity<List<Author>> getAuthorList(){
        List<Author> authorList = authorService.getAuthorList();
        return  ResponseEntity.ok(authorList);
    }

    @PostMapping("/addAuthor")
    public ResponseEntity<Author> saveAuthor(@RequestBody AuthorDTO authorDTO){
        Author author=new Author();
        author.setAuthor_name(authorDTO.getAuthor_name());
        author.setEmail(authorDTO.getEmail());
        author.setAuthor_creation(authorDTO.getAuthor_creation());
        authorService.saveAuthor(author);
        return ResponseEntity.ok(author);
    }

    @DeleteMapping("/deleteAuthor/{id}")
    public ResponseEntity<String> deleteAuthor(@PathVariable Integer id){
        authorService.deleteAuthorById(id);
        return ResponseEntity.ok("Author Deleted Successfully");
    }

}
