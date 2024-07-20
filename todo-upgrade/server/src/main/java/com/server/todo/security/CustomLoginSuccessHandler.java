package com.server.todo.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.text.MessageFormat;

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
        response.addCookie(createCookie("authToken", token));
        response.sendRedirect("http://localhost:5173/todo");
    }

    private Cookie createCookie(String key, String value) {
        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(60 * 60 * 60);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        return cookie;
    }
}
