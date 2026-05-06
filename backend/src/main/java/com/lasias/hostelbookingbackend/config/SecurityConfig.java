package com.lasias.hostelbookingbackend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {


        // todo skapa custom AuthenticationFilter, alternativt snegla på separat  JWT & Oauth2 server.
        //private final AuthenticationFilter authenticationFilter;

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

            return http
                    .authorizeHttpRequests(auth -> {
                        auth.requestMatchers("/api/auth").permitAll();
                        auth.anyRequest().authenticated();
                    })
                    .oauth2Login(withDefaults())
                    .formLogin(withDefaults())
                    .build();
        }
}
