package com.blogpost.blog;


import com.blogpost.blog.dto.PostDTO;
import com.blogpost.blog.model.Author;
import com.blogpost.blog.model.Post;
import com.blogpost.blog.service.AuthorService;
import com.blogpost.blog.service.PostService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MockMvcResultMatchersDsl;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Optional;
import java.util.regex.Matcher;

@WebMvcTest
public class BlogPostControllerTest {
    @MockBean
    public AuthorService authorService;
    @MockBean
    public PostService postService;

    @Autowired
    private MockMvc mockMvc;
    @Test
    public void testPostController() throws Exception{
        Author author=new Author();
        author.setAuthor_id(1);
        Post post=new Post(1L,"test title","mock test","",author);
        Mockito.when(postService.getPostById(1L)).thenReturn(Optional.of(post));
        mockMvc.perform(MockMvcRequestBuilders.get("/posts/{id}",1))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.post_id", Matchers.is(1)))
                .andExpect(MockMvcResultMatchers.jsonPath("$.title",Matchers.is("test title")));
    }

    @Test
    public void testSavePostApi() throws Exception{
        Author author=new Author();
        author.setAuthor_id(2);
        PostDTO postDTO=new PostDTO();
        postDTO.setTitle("test title");
        postDTO.setDescription("test Description");
        postDTO.setAuthor_Id(2);
        Post post=new Post();
        post.setTitle(postDTO.getTitle());
        post.setDescription(postDTO.getDescription());
        post.setAuthor(author);
        ObjectMapper objectMapper=new ObjectMapper();
        String responseBody=objectMapper.writeValueAsString(postDTO);
       // Mockito.when(authorService.getAuthor(2)).thenReturn(Optional.of(author));
        Mockito.when(postService.savePost(post)).thenReturn(post);
        mockMvc.perform(MockMvcRequestBuilders.post("/addPost").contentType(MediaType.APPLICATION_JSON)
                .content(responseBody))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.title",Matchers.is("test title")))
                .andExpect(MockMvcResultMatchers.jsonPath("$.description",Matchers.is("test Description")));



        }



}
