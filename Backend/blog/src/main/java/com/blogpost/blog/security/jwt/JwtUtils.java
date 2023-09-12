package com.blogpost.blog.security.jwt;


import com.blogpost.blog.security.service.UserDetailsImplementation;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import  java.security.Key;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;

import java.util.Date;

@Component
public class JwtUtils {

    Logger logger= LoggerFactory.getLogger(JwtUtils.class);

    @Value("${BlogPost.app.jwtSecret}")
    private String jwtSecret;

    @Value("${BlogPost.app.jstExpiration}")
    private int jwtExpiration;

    public String generateJwtToken(Authentication authentication){
        UserDetailsImplementation userPrincipal=(UserDetailsImplementation)
                authentication.getPrincipal();
        return Jwts.builder()
                .setSubject(userPrincipal.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date().getTime()+ jwtExpiration)))
                .signWith(key(), SignatureAlgorithm.HS256)
                .compact()
                ;
    }

    private Key key(){
//        byte[] keyBytes = new byte[32]; // 32 bytes for 256 bits
//        byte[] secretBytes = jwtSecret.getBytes();
//
//        for (int i = 0; i < keyBytes.length; i++) {
//            keyBytes[i] = secretBytes[i % secretBytes.length];
//        }
        logger.info(String.valueOf(Keys.hmacShaKeyFor(jwtSecret.getBytes())));
       return Keys.hmacShaKeyFor(jwtSecret.getBytes());

    }

    public String getUserNameFromJwtToken(String token){
        logger.info(String.valueOf(Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(token).getBody().getSubject()));
        return Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(token).getBody().getSubject();
                //.parseClaimsJwt(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key())
                    .build().parse(token);
            return true;
        }
        catch (MalformedJwtException e){
            logger.error("Invalid JWT token: {}", e.getMessage());
        }
        catch (ExpiredJwtException e){
            logger.error("JWT Token Expired: {}", e.getMessage());
        }
        catch (UnsupportedJwtException e){
            logger.error("JWT token is unsupported: {}", e.getMessage());
        }
        catch (IllegalArgumentException e){
            logger.error("JWT claims string is empty: {}",e.getMessage());
        }
        return false;
    }


    public String generateJwtTokenFromUsername(String username) {
        return Jwts.builder().setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime()+jwtExpiration))
                .signWith(key(), SignatureAlgorithm.HS256)
                .compact();
    }
}
