package com.lasias.hostelbookingbackend.controllers;

import com.lasias.hostelbookingbackend.dtos.AuthRequestDTO;
import com.lasias.hostelbookingbackend.dtos.AuthResponseDTO;
import com.lasias.hostelbookingbackend.dtos.UserInformationDTO;
import com.lasias.hostelbookingbackend.services.AppUserService;
import jakarta.servlet.http.Cookie;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AppUserService appUserService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody AuthRequestDTO request) {
        Cookie jwtCookie = appUserService.loginUser(request);
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,jwtCookie.toString()).build();
    }

    // todo meddela ivan att denna flyttar till AppUserController & flytta denna
    @GetMapping("/me")
    public ResponseEntity<UserInformationDTO> provideUserDetails(){
        return ResponseEntity.ok(appUserService.provideUserDetails());
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout(){
        return appUserService.logout();
    }

}
