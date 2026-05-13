package com.lasias.hostelbookingbackend.controllers;

import com.lasias.hostelbookingbackend.dtos.AuthRequestDTO;
import com.lasias.hostelbookingbackend.dtos.RegisterNewUserDTO;
import com.lasias.hostelbookingbackend.dtos.UserInformationDTO;
import com.lasias.hostelbookingbackend.models.AppUser;
import com.lasias.hostelbookingbackend.models.UpdateUserDTO;
import com.lasias.hostelbookingbackend.repositories.AppUserRepository;
import com.lasias.hostelbookingbackend.services.AppUserService;
import com.lasias.hostelbookingbackend.services.JwtService;
import jakarta.inject.Inject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.resttestclient.TestRestTemplate;
import org.springframework.boot.resttestclient.autoconfigure.AutoConfigureTestRestTemplate;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureTestRestTemplate
class AppUserControllerTest {
    private final String USERFULLNAME = "John doe";
    private final String EMAIL = "john.doe@email.com";
    private final String PASSWORD = "JohnDoesPassword!123";

    @Autowired
    private TestRestTemplate restTemplate;
    @Autowired
    private AppUserRepository appUserRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;
    @Inject
    private AppUserService appUserService;

    @BeforeEach
    void setUp() {
        appUserRepository.deleteAll();
        AppUser user = new AppUser();
        user.setName(USERFULLNAME);
        user.setEmail(EMAIL);
        user.setPassword(passwordEncoder.encode(PASSWORD));
        user.setRole("USER");
        appUserRepository.save(user);
    }

    @Test
    void registerUser() {
        // bad registration supposed to fail.
        RegisterNewUserDTO newUserWithAlreadyRegisteredInformationDTO = new RegisterNewUserDTO(USERFULLNAME,EMAIL,PASSWORD);
        ResponseEntity<String> badRegisterResponse = restTemplate.postForEntity("/api/user/register",newUserWithAlreadyRegisteredInformationDTO,String.class);
        assertEquals(HttpStatus.BAD_REQUEST,badRegisterResponse.getStatusCode());

        // good registration supposed to succeed and return a jwt token.
        RegisterNewUserDTO newUserWithGoodInformationDTO = new RegisterNewUserDTO("Joanna Doe","joanna.doe@email.com","JoannaDoesPassword123!");
        ResponseEntity<String> goodBadRegisterResponse = restTemplate.postForEntity("/api/user/register",newUserWithGoodInformationDTO,String.class);
        assertEquals(HttpStatus.OK,goodBadRegisterResponse.getStatusCode());

        assertThat(goodBadRegisterResponse.getHeaders().getFirst(HttpHeaders.SET_COOKIE))
                .isNotNull()
                .contains("jwt=")
                .contains("Max-Age=")
                .contains("HttpOnly")
                .contains("Path=/");
    }

    @Test
    void updateUser() {

        String newEmail = "newEmail@email.com";
        String newName = "Doe John";
        String newPassword = "aNewPassword!2";
        UpdateUserDTO updateUserDTO = new UpdateUserDTO(newName,newPassword,newEmail);
        String jwtToken = jwtService.generateToken(EMAIL);
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.COOKIE, "jwt="+jwtToken);
        ResponseEntity<String> response = restTemplate.exchange(
                "/api/user",
                HttpMethod.PATCH,
                new HttpEntity<>(updateUserDTO,headers),
                String.class
        );

        AppUser user = appUserRepository.findByEmail(newEmail).orElse(null);
        assertTrue(appUserRepository.existsByEmail(newEmail));
        assertFalse(appUserRepository.existsByEmail(EMAIL));
        assertNotNull(user);
        assertNotEquals(user.getEmail(),EMAIL);
        assertEquals(newEmail, user.getEmail());
        assertNotEquals(user.getName(),USERFULLNAME);
        assertEquals(newName, user.getName());
        assertFalse(appUserService.validPassword(PASSWORD,user.getPassword()));
        assertTrue(appUserService.validPassword(newPassword,user.getPassword()));


    }

    @Test
    void provideUserDetails() {
    }

    @Test
    void deleteUser() {
    }
}