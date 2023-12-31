package com.blogpost.blog.controller;

import com.blogpost.blog.dto.*;
import com.blogpost.blog.exception.TokenRefreshException;
import com.blogpost.blog.model.Author;
import com.blogpost.blog.model.RefreshToken;
import com.blogpost.blog.model.User;
import com.blogpost.blog.repository.RefreshTokenRepository;
import com.blogpost.blog.repository.UserRepository;
import com.blogpost.blog.security.jwt.JwtUtils;
import com.blogpost.blog.security.service.RefreshTokenService;
import com.blogpost.blog.security.service.UserDetailsImplementation;
import com.blogpost.blog.service.AuthorService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    Logger logger= LoggerFactory.getLogger(AuthorController.class);
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    AuthorService authorService;
    @Autowired
    RefreshTokenRepository refreshTokenRepository;
    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    RefreshTokenService refreshTokenService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequestDTO loginRequestDTO){
        Authentication authentication=authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequestDTO.getUsername(),loginRequestDTO.getPassword()));
        //logger.info(loginRequestDTO.getUsername());
        Optional<User> user=userRepository.findByUsername(loginRequestDTO.getUsername());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImplementation userDetailsImplementation=(UserDetailsImplementation) authentication.getPrincipal();
        logger.info(String.valueOf("login-api"+String.valueOf(userDetailsImplementation.getId())));
        logger.info(String.valueOf("login-api"+String.valueOf(userDetailsImplementation.getUsername())));

        String jwt=jwtUtils.generateJwtToken(authentication);
        int related_author= authorService.getAuthorByUser(user.get().getUsername());
        logger.info(String.valueOf(related_author));
        Optional<RefreshToken> rft = refreshTokenRepository.findByUser_Id(user.get().getId());
        if(rft.isPresent()){
            String existingRefresh=rft.get().getToken();
            if(rft.get().getExpiryDate().compareTo(Instant.now())<0){
                refreshTokenService.deleteByUserId(user.get().getId());

                return ResponseEntity.ok(new JwtResponse(jwt,"Bearer",refreshTokenService.generateRefreshToken(userDetailsImplementation.getId()).getToken(),userDetailsImplementation.getId(),
                        userDetailsImplementation.getUsername(), userDetailsImplementation.getEmail(), related_author));
            }
            else {
                return ResponseEntity.ok(new JwtResponse(jwt,"Bearer",existingRefresh,userDetailsImplementation.getId(),
                    userDetailsImplementation.getUsername(), userDetailsImplementation.getEmail(), related_author));
            }
        }

        return ResponseEntity.ok(new JwtResponse(jwt,"Bearer",refreshTokenService.generateRefreshToken(userDetailsImplementation.getId()).getToken(),userDetailsImplementation.getId(),
                    userDetailsImplementation.getUsername(), userDetailsImplementation.getEmail(), related_author));

    }

    @PostMapping("/signUp")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpDTO signUpDTO){
        logger.info((signUpDTO.getUsername()));
        logger.info((signUpDTO.getEmail()));
        logger.info((signUpDTO.getPassword()));
        if(userRepository.existsByUsername(signUpDTO.getUsername())){
            return ResponseEntity.badRequest().body(new JwtMessageResponse("Error: Username is already taken"));
        }
        if(userRepository.existsByEmail(signUpDTO.getEmail())){
            return ResponseEntity.badRequest().body(new JwtMessageResponse("Error: Email is already in use"));
        }
        User user =new User(signUpDTO.getUsername(),  signUpDTO.getEmail(), passwordEncoder.encode(signUpDTO.getPassword()));
        userRepository.save(user);
        LocalDateTime currentDateTime = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSSSSS");
        String creation_Time = currentDateTime.format(formatter);
        Author author=new Author();
        author.setAuthor_name(signUpDTO.getUsername());
        author.setEmail(signUpDTO.getEmail());
        author.setAuthor_creation(creation_Time);
        authorService.saveAuthor(author);
        return  ResponseEntity.ok(new JwtMessageResponse("User registered successfully"));
    }

    @PostMapping("/refreshToken")
    public ResponseEntity<?> refreshToken(@RequestBody TokenRefreshRequest request){
        String requestRefresh=request.getRefreshToken();
        return refreshTokenService.findByToken(requestRefresh)
                .map(refreshTokenService::verifyTokenExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    String token=jwtUtils.generateJwtTokenFromUsername(user.getUsername());
                    return  ResponseEntity.ok(new TokenRefreshResponse(token, requestRefresh));
                })
                .orElseThrow(()-> new TokenRefreshException(requestRefresh,"Refresh token is not in Database"));

    }

    @PostMapping("/signOut")
    public ResponseEntity<?> logOut(@RequestHeader String userName){

        logger.info(userName);
       Optional<User> signOutUser= userRepository.findByUsername(userName);
       if(signOutUser.isPresent()){
           Long userId=signOutUser.get().getId();
           int rowsEffected=refreshTokenService.deleteByUserId(userId);
           logger.info(String.valueOf(rowsEffected));
           return ResponseEntity.ok(new JwtMessageResponse("Logged out Successfully"));
       }
       else{
           return ResponseEntity.badRequest().body(new JwtMessageResponse("Internal server error try again later.."));
       }
    }

}
