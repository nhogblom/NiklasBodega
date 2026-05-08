package com.lasias.hostelbookingbackend.services;
import com.lasias.hostelbookingbackend.dtos.AuthRequestDTO;
import com.lasias.hostelbookingbackend.dtos.AuthResponseDTO;
import com.lasias.hostelbookingbackend.dtos.RegisterNewUserDTO;
import com.lasias.hostelbookingbackend.dtos.UserInformationDTO;
import com.lasias.hostelbookingbackend.models.AppUser;
import com.lasias.hostelbookingbackend.models.AuthProvider;
import com.lasias.hostelbookingbackend.models.UpdateUserDTO;
import com.lasias.hostelbookingbackend.repositories.AppUserRepository;
import com.lasias.hostelbookingbackend.repositories.BookingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpCookie;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Slf4j
@Service
@RequiredArgsConstructor
public class AppUserService {
    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final BookingRepository bookingRepository;


    // register user through OAuth2 providers
    public void register(String name, String email, String authProviderId,AuthProvider authProvider){
        if (appUserRepository.findByEmail(email).isPresent()){
            log.error("Registration failed, email already in use:");
            throw new IllegalArgumentException("Email already in use");
        }
        AppUser user = new AppUser();
        user.setName(name);
        user.setEmail(email);
        user.setAuthProvider(authProvider);
        user.setAuthProviderId(authProviderId);
        user.setRole("USER");
        log.info("New user registered: {}", user.getEmail());
        appUserRepository.save(user);
    }

    // register user through user information from the frontend.
    public AuthResponseDTO register(RegisterNewUserDTO newUser){
        if (appUserRepository.findByEmail(newUser.email()).isPresent()){
            log.error("Registration failed, email already in use:");
            throw new IllegalArgumentException("Email already in use");
        }
        AppUser user = new AppUser();
        user.setName(newUser.firstName() + " " + newUser.lastName());
        user.setEmail(newUser.email());
        user.setPassword(hashPassword(newUser.password()));
        user.setRole("USER");
        appUserRepository.save(user);
        log.info("New user registered: {}", user.getEmail());
        return new AuthResponseDTO(jwtService.generateToken(user.getEmail()));
    }


    // login user without OAuth2 providers
    public AuthResponseDTO loginUser(AuthRequestDTO request) {
        if (request == null){
            log.error("Local login request is null whe loginUser is called");
            throw new IllegalArgumentException("Request is null");
        }
        String email = request.email();
        String password = request.password();
        if (email == null || password == null){
            log.error("Login failed, email and password are required");
            throw new IllegalArgumentException("Email and password are required");
        }
        AppUser user = appUserRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        if (validPassword(password, user.getPassword())){
            return new AuthResponseDTO(jwtService.generateToken(user.getEmail()));
        }
        throw new IllegalArgumentException("Invalid credentials");
    }

    public boolean validPassword(String password, String hashedPassword){
        return hashPassword(password).equals(hashedPassword);
    }

    public boolean passwordMatchesCriteria(String password){
        String regex = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\\S+$).{8,}$";
        return password.matches(regex);
    }

    private boolean isValidEmail(String email) {
        // Ett robust regex som tillåter moderna domäner (fler än 6 tecken)
        String regex = "^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}$";
        return email.matches(regex);
    }


    public String hashPassword(String password){
        return passwordEncoder.encode(password);
    }

    public void updateUser(UpdateUserDTO updateUserDTO) {
        AppUser user = (AppUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (user == null){
            log.error("User not found when updating user");
            throw new IllegalArgumentException("User not found");
        }
        if (updateUserDTO.name() != null){
            String newName = updateUserDTO.name();
            if (newName.length() >= 3 && newName.length() <= 50){}
            user.setName(updateUserDTO.name());
        }
        if (updateUserDTO.email() != null){
            String newEmail = updateUserDTO.email();
            if(!isValidEmail(newEmail)){
                log.error("Invalid email format");
                throw new IllegalArgumentException("Invalid email format");
            }
            user.setEmail(newEmail);
        }
        if (updateUserDTO.password() != null){
            String newPassword = updateUserDTO.password();
            if(!passwordMatchesCriteria(newPassword)){
                throw new IllegalArgumentException("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character");
            }
            user.setPassword(hashPassword(newPassword));
        }
        log.info("User updated: {}", user.getEmail());
        appUserRepository.save(user);

    }

    public void deleteMe() {
        AppUser user = (AppUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (user == null){
            log.error("Unable to delete user, User not found");
            throw new IllegalArgumentException("Unable to delete user, User not found");
        }

        if(bookingRepository.existsByUser(user)){
            log.error("Unable to delete user, User has bookings");
            throw new IllegalArgumentException("Unable to delete user, User has bookings");
        }
        log.info("User deleted: {}", user.getEmail());
        appUserRepository.delete(user);
    }

    public UserInformationDTO provideUserDetails() {
        AppUser user = (AppUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (user == null){
            log.error("User not found when retrieving user details");
            throw new IllegalArgumentException("User not found");
        }
        log.info("User details retrieved: {}", user.getEmail());
        return new UserInformationDTO(user.getEmail(),user.getName(),user.getRole(),user.getCreatedAt());
    }

    public ResponseEntity<String> logout() {
        AppUser user = (AppUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (user == null){
            log.error("User not found when logging out");
            throw new IllegalArgumentException("User not found");
        }
        HttpCookie cookie = ResponseCookie.from("jwt","")
                .path("/")
                .maxAge(0)
                .httpOnly(true)
                .build();
        SecurityContextHolder.clearContext();
        log.info("User logged out: {}", user.getEmail());
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,cookie.toString()).build();
    }
}
