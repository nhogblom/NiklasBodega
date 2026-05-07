package com.lasias.hostelbookingbackend.controllers;

import com.lasias.hostelbookingbackend.dtos.AuthRequestDTO;
import com.lasias.hostelbookingbackend.dtos.AuthResponseDTO;
import com.lasias.hostelbookingbackend.services.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AppUserService appUserService;

    @PostMapping("/")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody AuthRequestDTO request) {
        return appUserService.localLogin(request);
    }
}
