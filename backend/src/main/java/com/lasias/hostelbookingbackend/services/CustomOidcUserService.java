package com.lasias.hostelbookingbackend.services;

import com.lasias.hostelbookingbackend.models.AppUser;
import com.lasias.hostelbookingbackend.models.AuthProvider;
import com.lasias.hostelbookingbackend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomOidcUserService extends OidcUserService {
    private final UserService userService;
    private final UserRepository userRepository;

    @Override
    public OidcUser loadUser(OidcUserRequest userRequest) throws OAuth2AuthenticationException{
        OidcUser oidcUser = super.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        String email = oidcUser.getEmail();
        String name = oidcUser.getName();

        Optional<AppUser> existingUser = userRepository.findByEmail(email);

        if (existingUser.isPresent()){
            log.info("User logged in with email: {}", existingUser.get().getEmail());
        }
        else
        {
            AuthProvider authProvider = AuthProvider.valueOf(registrationId.toUpperCase());
            String authProviderId = oidcUser.getName();
            userService.register(name,email,authProviderId,authProvider);
            log.info("New user registered with email: {}", email);
        }
        return oidcUser;
    }

}
