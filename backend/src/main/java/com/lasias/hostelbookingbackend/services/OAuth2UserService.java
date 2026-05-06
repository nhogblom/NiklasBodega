package com.lasias.hostelbookingbackend.services;

import com.lasias.hostelbookingbackend.models.AppUser;
import com.lasias.hostelbookingbackend.models.AuthProvider;
import com.lasias.hostelbookingbackend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OAuth2UserService extends DefaultOAuth2UserService {
    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException{
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();

        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        if (email == null){
            email = oAuth2User.getAttribute("login") + "@github.com";
        }

        Optional<AppUser> oUser = userRepository.findByEmail(email);
        AppUser user;

        if(oUser.isPresent()){
            user = oUser.get();
        }else{
            user = new AppUser();
            user.setName(name);
            user.setEmail(email);
            user.setAuthProvider(AuthProvider.valueOf(registrationId));
            user.setAuthProviderId(oAuth2User.getName());
            userRepository.save(user);
        }
        return oAuth2User;
    }
}
