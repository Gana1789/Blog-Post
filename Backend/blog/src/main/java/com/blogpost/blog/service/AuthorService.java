package com.blogpost.blog.service;

import com.blogpost.blog.controller.PostController;
import com.blogpost.blog.model.Author;
import com.blogpost.blog.model.Post;
import com.blogpost.blog.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;
import java.util.Optional;

@Service
public class AuthorService {
    Logger logger=LoggerFactory.getLogger(AuthorService.class);
    @Autowired
    public AuthorRepository authorRepository;

    public Optional<Author> getAuthor(int id){
        return  authorRepository.findById(id);
    }
    public int getAuthorByUser(String user){
        return  authorRepository.findByAuthorName(user);
    }

    public List<Author> getAuthorList(){
        return authorRepository.findAll();
    }

    public void saveAuthor(Author author){
        logger.info(String.valueOf(authorRepository.findMaxAuthor_Id()));
       // author.setAuthor_id(authorRepository.findMaxAuthor_Id()+1);
        logger.info(String.valueOf(author.getAuthor_id()));
        authorRepository.save(author);
    }

    public List<Post> getPostsByAuthor(Integer id){
        Optional<Author> author=authorRepository.findById(id);
        if(author.isPresent()){
            List<Post> posts;
            posts = author.get().getPosts();
            return posts;
        }
        return  null;
    }

    public void deleteAuthorById(Integer id){
        logger.info(String.valueOf(id));
        authorRepository.deleteById(id);
    }
}
