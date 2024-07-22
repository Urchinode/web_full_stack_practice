package com.server.todo.security;

import com.server.todo.dto.OAuth2UserInfo;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Enumeration;

@RequiredArgsConstructor
@Component
public class TokenAuthenticationFilter extends OncePerRequestFilter {
    private final OAuthTokenProvider oAuthTokenProvider;
    private Logger logger = com.server.todo.utils.Logger.getLogger(this.getClass());

    // OAuth 로그인 요청시 동작.
    // 헤더의 토큰을 유효성 검사 + 재발급
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String accessToken = resolveToken(request);
        logger.info("ACCESS TOKEN: {} FROM {}", accessToken, request.getRequestURI());
        try {
            if(oAuthTokenProvider.validateToken(accessToken)) setAuthentication(accessToken);
            else{
                String reissueAccessToken = oAuthTokenProvider.reIssueAccessToken(accessToken);

                if(StringUtils.hasText(reissueAccessToken)){
                    setAuthentication(reissueAccessToken);
                    response.setHeader("Authorization", "Bearer " + reissueAccessToken);
                }
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        filterChain.doFilter(request, response);
    }

    private void setAuthentication(String accessToken) throws Exception {
        Authentication authentication = oAuthTokenProvider.getAuthentication(accessToken);
        logger.info("THE AUTHENTICATION IS: {}", authentication.getName());
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    private String resolveToken(HttpServletRequest request){
//        printAllHeaders(request);
        Cookie[] cookies = request.getCookies();
        if (cookies == null) return null;
        for (Cookie cookie: cookies){
            logger.info("COOKIE IN REQUEST: {} : {}", cookie.getName(), cookie.getValue());
            if(cookie.getName().equals("authToken")) return cookie.getValue();
        }
        String token = request.getHeader("Authorization");
        if ((ObjectUtils.isEmpty(token)) || !token.startsWith("Bearer ")) return null;
        return token.substring(7);
    }

    private void printAllHeaders(HttpServletRequest request) {
        Enumeration<String> headerNames = request.getHeaderNames();
        while (headerNames.hasMoreElements()) {
            String headerName = headerNames.nextElement();
            Enumeration<String> headers = request.getHeaders(headerName);
            while (headers.hasMoreElements()) {
                String headerValue = headers.nextElement();
                logger.info("{}: {}", headerName, headerValue);
            }
        }
    }
}
