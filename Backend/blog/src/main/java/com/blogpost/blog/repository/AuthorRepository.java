package com.blogpost.blog.repository;



import com.blogpost.blog.model.Author;
import com.blogpost.blog.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.*;
@Repository
public interface AuthorRepository extends JpaRepository<Author,Integer> {
  Optional<Author> findById(int id);

  @Query("SELECT MAX(a.author_id) FROM Author a")
  Integer findMaxAuthor_Id();

  //List<Post> findPostById(Integer id);

}
