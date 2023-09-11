package com.blogpost.blog.configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;

@Component
public class CustomCorsConfigurer extends AbstractHttpConfigurer<CustomCorsConfigurer, HttpSecurity> {

    @Override
    public void configure(HttpSecurity http) {
        try {
            http
                    .cors(cors -> {
                        // Customize CORS configuration here
                        cors
                                .configurationSource(request -> {
                                    CorsConfiguration configuration = new CorsConfiguration();
                                    configuration.addAllowedOrigin("http://localhost:5173");
                                    configuration.addAllowedMethod("*");
                                    configuration.addAllowedHeader("Authorization");
                                    return configuration;
                                });
                    });
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
