package com.server.todo.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@RequiredArgsConstructor
@Component
public class CustomLoginSuccessHandler implements AuthenticationSuccessHandler {
    private Logger logger = com.server.todo.utils.Logger.getLogger(this.getClass());
    private final OAuthTokenProvider oAuthTokenProvider;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication)
            throws IOException, ServletException {
        logger.info("AUTH TYPE: {}", authentication.getClass());
        String token = oAuthTokenProvider.generateAccessToken(authentication);
        oAuthTokenProvider.generateRefreshToken(authentication, token);
        logger.info("TOKEN CREATED: {}", token);
        response.setHeader("Authorization", "Bearer " + token);
        String redirectUrl = UriComponentsBuilder.fromUriString("/kakao-login")
//                .queryParam("token", token)
                .build()
                .toUriString();

        response.sendRedirect(redirectUrl);
    }
}
