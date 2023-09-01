package com.blogpost.blog;

import com.blogpost.blog.model.Author;
import com.blogpost.blog.model.Post;
import com.blogpost.blog.repository.AuthorRepository;
import com.blogpost.blog.repository.PostRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.Optional;

@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@DataJpaTest
class DatabaseTest {
    @Autowired
    public TestEntityManager testEntityManager;
    @Autowired
    public PostRepository postRepository;
    @Autowired
    public JdbcTemplate jdbcTemplate;
    @Autowired
    public AuthorRepository authorRepository;
    @Test
    public void mysqlTest(){
        Integer count = jdbcTemplate.queryForObject("select count(*) from posts", Integer.class);
        Assertions.assertEquals(3,count);


    }

    @Test
    public void testSaveAuthor(){
        Author author=new Author();
        author.setAuthor_name("Gana");
        Author saveAuthor=testEntityManager.persistAndFlush(author);
        Optional<Author> retrievedAuthor=authorRepository.findById(saveAuthor.getAuthor_id());
        Assertions.assertNotNull(retrievedAuthor.get());
        Assertions.assertEquals(retrievedAuthor.get().getAuthor_name(),"Gana");


    }

    @Test
    public void testSavePost(){
        Post post=new Post();
        post.setTitle("Test Title");
        post.setDescription("testing JPA");
        Author author=new Author();
        author.setAuthor_id(2);
        post.setAuthor(author);
        Post savePost=testEntityManager.persistAndFlush(post);
        Optional<Post> retrievedPost=postRepository.findById(savePost.getPost_id());
        Assertions.assertEquals(retrievedPost.get().getTitle(),post.getTitle());
        Assertions.assertNotEquals(retrievedPost.get().getCreated_time(),post.getDescription());
    }

}
