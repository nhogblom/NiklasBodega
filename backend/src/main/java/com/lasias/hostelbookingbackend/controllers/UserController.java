package com.lasias.hostelbookingbackend.controllers;


import com.lasias.hostelbookingbackend.dto.AuthResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register() {
        // do stuff
        return ResponseEntity.ok().body(new AuthResponse("korv"));
    }

    @PostMapping("/password")
    public ResponseEntity<AuthResponse> changePassword(){
        // do stuff
        return ResponseEntity.ok().body(new AuthResponse("korv"));
    }

    
}
