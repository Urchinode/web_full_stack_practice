package com.server.todo.service;

import com.server.todo.dto.OAuth2UserInfo;
import com.server.todo.entity.UserEntity;
import com.server.todo.repository.UserRepository;
import com.server.todo.security.PrincipalDetails;
import com.server.todo.utils.Logger;
import jakarta.security.auth.message.AuthException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    private final UserRepository userRepository;
    private org.slf4j.Logger logger = Logger.getLogger(this.getClass());

    @Transactional
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        logger.info("OAUTH USER: " + oAuth2User);
        Map<String, Object> oAuthAttrs = oAuth2User.getAttributes();
        UserEntity user;
        String registrationId = userRequest
                .getClientRegistration()
                .getRegistrationId();
        logger.info("REGISTRATION ID: " + registrationId); // OAuth2 Provider name
        String userNameAttrName = userRequest
                .getClientRegistration()
                .getProviderDetails()
                .getUserInfoEndpoint()
                .getUserNameAttributeName();
        logger.info("USERNAME ATTRIBUTE NAME: " + userNameAttrName);
        try {
            OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfo.of(registrationId, oAuthAttrs);
            logger.info("USER INFO: " + oAuth2UserInfo);
            user = findOrSave(oAuth2UserInfo);
        } catch (AuthException e) {
            throw new RuntimeException(e);
        }
        return new PrincipalDetails(user, oAuthAttrs, userNameAttrName);
    }

    private UserEntity findOrSave(OAuth2UserInfo oAuth2UserInfo) {
        UserEntity userEntity = userRepository.findByEmail(oAuth2UserInfo.email())
                .orElseGet(oAuth2UserInfo::toUserEntity);
        return userRepository.save(userEntity);
    }
}