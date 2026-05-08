package com.lasias.hostelbookingbackend.services;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {

    @Value("${app.jwt.secret}")
    private String secretKey;

    public String generateToken(String email){
        int expiryTime = 86400000;
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiryTime))
                .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()))
                .compact();
    }

    public String extractEmail(String token){
        return Jwts.parserBuilder()
                .setSigningKey(secretKey.getBytes())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public String createJwtCookie(String email,boolean logoutCookie){
        Cookie cookie = new Cookie("jwt", (logoutCookie ? "" : generateToken(email)));
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(logoutCookie ? (60 * 60 * 24) : 0);
        cookie.setSecure(false); // todo sätt till true när vi kör https.
        return cookie;
    }
}
