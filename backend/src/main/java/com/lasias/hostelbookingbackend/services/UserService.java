package com.lasias.hostelbookingbackend.services;
import com.lasias.hostelbookingbackend.models.AppUser;
import com.lasias.hostelbookingbackend.models.AuthProvider;
import com.lasias.hostelbookingbackend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public void register(String name, String email, String authProviderId,AuthProvider authProvider){
        AppUser user = new AppUser();
        user.setName(name);
        user.setEmail(email);
        user.setAuthProvider(authProvider);
        user.setAuthProviderId(authProviderId);
        AppUser newlyRegisteredUser = userRepository.save(user);
    }
}
