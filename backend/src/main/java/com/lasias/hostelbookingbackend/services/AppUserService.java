package com.lasias.hostelbookingbackend.services;
import com.lasias.hostelbookingbackend.dtos.AuthRequestDTO;
import com.lasias.hostelbookingbackend.dtos.AuthResponseDTO;
import com.lasias.hostelbookingbackend.models.AppUser;
import com.lasias.hostelbookingbackend.models.AuthProvider;
import com.lasias.hostelbookingbackend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AppUserService {
    private final UserRepository userRepository;

    public void register(String name, String email, String authProviderId,AuthProvider authProvider){
        AppUser user = new AppUser();
        user.setName(name);
        user.setEmail(email);
        user.setAuthProvider(authProvider);
        user.setAuthProviderId(authProviderId);
        userRepository.save(user);
    }



    public ResponseEntity<AuthResponseDTO> localLogin(AuthRequestDTO request) {
        if (request == null){
            log.error("Local login request is null");
            throw new IllegalArgumentException("Request is null");
        }
        String email = request.email().trim().toLowerCase();
        String password = request.password();
        if (email == null || password == null){
            log.error("Login failed, email and password are required");
            throw new IllegalArgumentException("Email and password are required");
        }
        // todo gör klart detta.
        return null;
    }
}
