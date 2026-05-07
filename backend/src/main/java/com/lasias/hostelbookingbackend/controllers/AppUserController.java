package com.lasias.hostelbookingbackend.controllers;



import com.lasias.hostelbookingbackend.dtos.AuthResponseDTO;
import com.lasias.hostelbookingbackend.dtos.RegisterNewUserDTO;
import com.lasias.hostelbookingbackend.models.UpdateUserDTO;
import com.lasias.hostelbookingbackend.services.AppUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class AppUserController {

    private final AppUserService appUserService;


    @PostMapping
    public ResponseEntity<AuthResponseDTO> registerUser(@Valid @RequestBody RegisterNewUserDTO newUser) {
        return ResponseEntity.ok().body(appUserService.register(newUser));
    }

    @PatchMapping
    public ResponseEntity<String> updateUser(@RequestBody UpdateUserDTO updateUserDTO){
        appUserService.updateUser(updateUserDTO);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<String> deleteUser(){
        appUserService.deleteMe();
        return ResponseEntity.ok().build();
    }

    
}
