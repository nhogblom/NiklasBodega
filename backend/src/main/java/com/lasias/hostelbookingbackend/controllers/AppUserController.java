package com.lasias.hostelbookingbackend.controllers;



import com.lasias.hostelbookingbackend.dtos.AuthResponseDTO;
import com.lasias.hostelbookingbackend.dtos.RegisterNewUserDTO;
import com.lasias.hostelbookingbackend.dtos.UserInformationDTO;
import com.lasias.hostelbookingbackend.models.AppUser;
import com.lasias.hostelbookingbackend.models.UpdateUserDTO;
import com.lasias.hostelbookingbackend.services.AppUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class AppUserController {

    private final AppUserService appUserService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> registerUser(@Valid @RequestBody RegisterNewUserDTO newUser) {
        return ResponseEntity.ok().body(appUserService.register(newUser));
    }

    @PatchMapping
    public ResponseEntity<String> updateUser(@RequestBody UpdateUserDTO updateUserDTO, @AuthenticationPrincipal AppUser user) {
        appUserService.updateUser(updateUserDTO, user);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<UserInformationDTO> provideUserDetails(@AuthenticationPrincipal AppUser user) {
        return ResponseEntity.ok(appUserService.provideUserDetails(user));
    }

    @DeleteMapping
    public ResponseEntity<String> deleteUser(@AuthenticationPrincipal AppUser user) {
        appUserService.deleteMe(user);
        return ResponseEntity.ok().build();
    }

    
}
