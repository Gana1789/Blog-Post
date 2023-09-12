package com.blogpost.blog.security.service;

import com.blogpost.blog.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Objects;

public class UserDetailsImplementation implements UserDetails {

    private Long id;

    private  String username;
    private String email;
    @JsonIgnore
    private String password;
    public UserDetailsImplementation(Long id,
                                     String username,
                                     String email,String password
                                     ){
        this.id=id;
        this.username=username;
        this.email=email;
        this.password=password;
    }

    public static UserDetailsImplementation build(User user){
        return new UserDetailsImplementation(user.getId(),
                user.getUsername(),user.getEmail(), user.getPassword());

    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }


    public Long getId(){
        return id;
    }
    public String getEmail(){
        return email;
    }
    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        UserDetailsImplementation user = (UserDetailsImplementation) o;
        return Objects.equals(id, user.id);
    }
}
