package com.blogpost.blog.repository;

import com.blogpost.blog.model.Post;
import com.blogpost.blog.model.Reactions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReactionRepository extends JpaRepository<Reactions,Integer> {
    Optional<Reactions> findByPost(Post post);
}
