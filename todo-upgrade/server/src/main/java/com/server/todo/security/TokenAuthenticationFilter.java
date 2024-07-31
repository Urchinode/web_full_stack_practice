package com.server.todo.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.nio.file.AccessDeniedException;
import java.text.MessageFormat;
import java.util.Enumeration;
import java.util.List;

@RequiredArgsConstructor
@Component
public class TokenAuthenticationFilter extends OncePerRequestFilter {
    private final OAuthTokenProvider oAuthTokenProvider;
    private final Logger logger = com.server.todo.utils.Logger.getLogger(this.getClass());

    // 로그인 수행시 skip
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        List<String> freeUrls = List.of("/login", "/swagger-ui", "/swagger-resources", "/api-docs");
        for(String url: freeUrls){
            if(StringUtils.startsWithIgnoreCase(request.getRequestURI(), url)) return true;
        }
        return false;
    }

    // OAuth 로그인 요청시 동작.
    // 헤더의 토큰을 유효성 검사 + 재발급
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String accessToken = oAuthTokenProvider.resolveToken(request, TokenKey.ACCESS_TOKEN);
        // ACCESS TOKEN 쿠키 부재시 에러
        if (accessToken == null) {
            throw new AccessDeniedException(MessageFormat.format("NO ACCESS TOKEN {0}", request.getRequestURI()));
        }

        if (oAuthTokenProvider.validateToken(accessToken)) setAuthentication(accessToken);
        else {
            String refreshToken = oAuthTokenProvider.resolveToken(request, TokenKey.REFRESH_TOKEN);
            String reissueAccessToken = oAuthTokenProvider.reIssueAccessToken(refreshToken);
            logger.info("REFRESH TOKEN: {} ,REISSUED TOKEN: {}", refreshToken, reissueAccessToken);
            if (StringUtils.hasText(reissueAccessToken)) {
                response.addCookie(oAuthTokenProvider.createCookie(TokenKey.ACCESS_TOKEN.getName(), reissueAccessToken));
                setAuthentication(reissueAccessToken);
            } else {
                throw new AccessDeniedException("TOKEN EXPIRED.");
            }
        }

        filterChain.doFilter(request, response);
    }

    private void setAuthentication(String accessToken) {
        Authentication authentication = oAuthTokenProvider.getAuthentication(accessToken);
        logger.info("THE AUTHENTICATION IS: {}", authentication.getName());
        SecurityContextHolder.getContext().setAuthentication(authentication);
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
