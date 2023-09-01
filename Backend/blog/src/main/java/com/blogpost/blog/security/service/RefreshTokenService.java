package com.blogpost.blog.security.service;

import com.blogpost.blog.dto.TokenRefreshResponse;
import com.blogpost.blog.exception.TokenRefreshException;
import com.blogpost.blog.model.RefreshToken;
import com.blogpost.blog.model.User;
import com.blogpost.blog.repository.RefreshTokenRepository;
import com.blogpost.blog.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenService extends RuntimeException {

    Logger logger=LoggerFactory.getLogger(RefreshTokenService.class);
    @Value("${BlogPost.app.jwtRefreshExpirationMs}")
    private Long refreshTokenDuration;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private UserRepository userRepository;

    public Optional<RefreshToken> findByToken(String token){
        return refreshTokenRepository.findByToken(token);
    }

    public RefreshToken generateRefreshToken(Long userId) {
        RefreshToken refreshToken=new RefreshToken();
        Optional<User> user=userRepository.findById(userId);

        if(user.isPresent()) {
            logger.info(String.valueOf("RTS"+String.valueOf(user.get().getId())));
            refreshToken.setUser(user.get());
        }
        else throw new RuntimeException();
        refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDuration));
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken=refreshTokenRepository.save(refreshToken);
        return refreshToken;
    }

    public RefreshToken verifyTokenExpiration(RefreshToken token){
        if(token.getExpiryDate().compareTo(Instant.now())<0){
            refreshTokenRepository.delete(token);
            throw new TokenRefreshException(token.getToken(),"Refresh token was expired. Please signin again");

        }
        return token;
    }
    @Transactional
    public int deleteByUserId(Long userId){
        return refreshTokenRepository.deleteByUser(userRepository.findById(userId).get());
    }

}
