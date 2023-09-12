package com.blogpost.blog.security.service;

import com.blogpost.blog.model.User;
import com.blogpost.blog.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImplementation implements UserDetailsService {
    @Autowired
    public  UserRepository userRepository;
    Logger logger= LoggerFactory.getLogger(UserDetailsServiceImplementation.class);
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user=userRepository.findByUsername(username)
                .orElseThrow(()-> new UsernameNotFoundException("User Not found with the username:"+ username));
        logger.info(String.valueOf("UDSI"+String.valueOf(user.getId())));
        return UserDetailsImplementation.build(user);
    }
}
