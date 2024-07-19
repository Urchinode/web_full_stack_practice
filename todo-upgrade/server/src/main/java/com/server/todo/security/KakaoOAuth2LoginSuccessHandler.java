package com.server.todo.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@RequiredArgsConstructor
@Component
public class KakaoOAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {
    private final OAuthTokenProvider oAuthTokenProvider;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication)
            throws IOException, ServletException {
        System.out.println("AUTH TYPE: " + authentication.getClass());
        String token = oAuthTokenProvider.generateAccessToken(authentication);
        oAuthTokenProvider.generateRefreshToken(authentication, token);
        System.out.println("TOKEN CREATED: " + token);
        response.setHeader("Authorization", "Bearer " + token);
        String redirectUrl = UriComponentsBuilder.fromUriString("/kakao-login")
                .queryParam("token", token)
                .build()
                .toUriString();

        response.sendRedirect(redirectUrl);
    }
}
