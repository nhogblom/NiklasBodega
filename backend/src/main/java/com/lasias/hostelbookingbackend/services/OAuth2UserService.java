package com.lasias.hostelbookingbackend.services;

import com.lasias.hostelbookingbackend.models.AppUser;
import com.lasias.hostelbookingbackend.enums.AuthProvider;
import com.lasias.hostelbookingbackend.repositories.AppUserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class OAuth2UserService extends DefaultOAuth2UserService {
    private final AppUserRepository appUserRepository;
    private final AppUserService appUserService;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException{
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String providerName = userRequest.getClientRegistration().getRegistrationId().toUpperCase();

        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        if (email == null){
            email = oAuth2User.getAttribute("login") + "@github.com";
        }

        Optional<AppUser> existingUser = appUserRepository.findByEmail(email);
        AppUser user;

        if(existingUser.isPresent()){
            user = existingUser.get();
            log.info("User logged in with email: {} authenticated by {}", user.getEmail(),providerName);
        }else{
            AuthProvider authProvider = AuthProvider.valueOf(providerName);
            String authProviderId = oAuth2User.getName();
            appUserService.register(name,email,authProviderId,authProvider);
            log.info("New user registered with email: {} authenticated by {}", email,providerName);
        }
        return oAuth2User;
    }
}
