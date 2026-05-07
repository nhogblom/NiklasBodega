package com.lasias.hostelbookingbackend.services;
import com.lasias.hostelbookingbackend.dtos.AuthRequestDTO;
import com.lasias.hostelbookingbackend.dtos.AuthResponseDTO;
import com.lasias.hostelbookingbackend.dtos.RegisterNewUserDTO;
import com.lasias.hostelbookingbackend.models.AppUser;
import com.lasias.hostelbookingbackend.models.AuthProvider;
import com.lasias.hostelbookingbackend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AppUserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;


    // register user through OAuth2 providers
    public void register(String name, String email, String authProviderId,AuthProvider authProvider){
        AppUser user = new AppUser();
        user.setName(name);
        user.setEmail(email);
        user.setAuthProvider(authProvider);
        user.setAuthProviderId(authProviderId);
        user.setRole("USER");
        userRepository.save(user);
    }

    // register user through user information from the frontend.
    public AuthResponseDTO register(RegisterNewUserDTO newUser){
        if (userRepository.findByEmail(newUser.email()).isPresent()){
            throw new IllegalArgumentException("Email already in use");
        }
        AppUser user = new AppUser();
        user.setName(newUser.firstName() + " " + newUser.lastName());
        user.setEmail(newUser.email());
        user.setPassword(hashPassword(newUser.password()));
        user.setRole("USER");
        userRepository.save(user);

        return new AuthResponseDTO(jwtService.generateToken(user.getEmail()));
    }


    // login user without OAuth2 providers
    public AuthResponseDTO loginUser(AuthRequestDTO request) {
        if (request == null){
            log.error("Local login request is null");
            throw new IllegalArgumentException("Request is null");
        }
        String email = request.email();
        String password = request.password();
        if (email == null || password == null){
            log.error("Login failed, email and password are required");
            throw new IllegalArgumentException("Email and password are required");
        }
        AppUser user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        if (validPassword(password, user.getPassword())){
            return new AuthResponseDTO(jwtService.generateToken(user.getEmail()));
        }
        throw new IllegalArgumentException("Invalid credentials");
    }

    public boolean validPassword(String password, String hashedPassword){
        return hashPassword(password).equals(hashedPassword);
    }

    public String hashPassword(String password){
        return passwordEncoder.encode(password);
    }
}
