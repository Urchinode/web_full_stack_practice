package com.server.todo.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@RequiredArgsConstructor
@Component
public class CustomOAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {
    private final Logger logger = com.server.todo.utils.Logger.getLogger(this.getClass());
    private final OAuthTokenProvider oAuthTokenProvider;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication)
            throws IOException, ServletException {
        String SUCCESS_REDIRECT_URL = "http://localhost:5173/todo";
        logger.info("AUTH TYPE: {}", authentication.getClass());
        String token = oAuthTokenProvider.generateAccessToken(authentication);
        String refreshToken = oAuthTokenProvider.generateRefreshToken(authentication, token);
        response.addCookie(oAuthTokenProvider.createCookie(TokenKey.ACCESS_TOKEN.getName(), token));
        response.addCookie(oAuthTokenProvider.createCookie(TokenKey.REFRESH_TOKEN.getName(), refreshToken));
        response.sendRedirect(SUCCESS_REDIRECT_URL);
    }
}
