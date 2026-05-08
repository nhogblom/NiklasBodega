package com.lasias.hostelbookingbackend.config;

import com.lasias.hostelbookingbackend.models.AppUser;
import com.lasias.hostelbookingbackend.repositories.AppUserRepository;
import com.lasias.hostelbookingbackend.services.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final AppUserRepository appUserRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        Cookie[] cookies = request.getCookies() != null ? request.getCookies() : null;
        Cookie jwtCookie = cookies != null ? Arrays.stream(cookies).filter(cookie -> cookie.getName().equals("jwt")).findFirst().orElse(null) : null;

        if (jwtCookie == null){
            filterChain.doFilter(request, response);
            return;
        }
        String jwt = jwtCookie.getValue();
        final String email;

        try {
            email = jwtService.extractEmail(jwt);
            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                Optional<AppUser> user = appUserRepository.findByEmail(email);
                if (user.isPresent()) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(user.get(), null, user.get().getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authToken);
                log.info("User authenticated: {}", user.get().getEmail());
                }
            }
        }catch (Exception e){
            log.error("Invalid JWT token received: {}", e.getMessage());
        }
        filterChain.doFilter(request, response);
    }
}
