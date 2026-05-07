package com.lasias.hostelbookingbackend.controllers;



import com.lasias.hostelbookingbackend.dtos.AuthResponseDTO;
import com.lasias.hostelbookingbackend.dtos.RegisterNewUserDTO;
import com.lasias.hostelbookingbackend.services.AppUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class AppUserController {

    private final AppUserService appUserService;
// todo add endpoints for changing details of a certain user.

    @PostMapping
    public ResponseEntity<AuthResponseDTO> registerUser(@Valid @RequestBody RegisterNewUserDTO newUser) {
        return ResponseEntity.ok().body(appUserService.register(newUser));
    }

    
}
