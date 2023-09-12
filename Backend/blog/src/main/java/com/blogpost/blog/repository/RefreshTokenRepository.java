package com.blogpost.blog.repository;

import com.blogpost.blog.model.RefreshToken;
import com.blogpost.blog.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken,Long> {
   Optional<RefreshToken> findByToken(String token);
   Optional<RefreshToken> findByUser_Id(long id);
   @Modifying
    int deleteByUser(User user);


}
