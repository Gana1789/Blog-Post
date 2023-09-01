package com.blogpost.blog.service;

import com.blogpost.blog.model.Post;
import com.blogpost.blog.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    public PostRepository postRepository;

    public List<Post> getAllPosts(){

        return postRepository.findAll();
    }

    public Optional<Post> getPostById(long id){
        return  postRepository.findById(id);
    }

    public Post savePost(Post newPost){
        return  postRepository.save(newPost);
    }

    public void deletePost(Long id){
         postRepository.deleteById(id);

    }


}
