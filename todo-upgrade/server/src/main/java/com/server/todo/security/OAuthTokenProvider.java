package com.server.todo.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecurityException;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.Cookie;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.crypto.SecretKey;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class OAuthTokenProvider {

    private final Logger logger = com.server.todo.utils.Logger.getLogger(this.getClass());

    @Value("${jwt.secret-key}")
    private String key;
    private SecretKey secretKey;
    private static final Long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 1L;
    private static final Long REFRESH_TOKEN_EXPIRE_TIME = 1000 * 1L;
    private static final String KEY_ROLE = "role";
    //private final TokenService tokenService;

    @PostConstruct
    private void setUpSecretKey(){
        secretKey = Keys.hmacShaKeyFor(key.getBytes());
    }

    public String generateAccessToken(Authentication authentication){
        logger.info("TOKEN FROM : {}", authentication);
        return generateToken(authentication, ACCESS_TOKEN_EXPIRE_TIME);
    }

    public String generateRefreshToken(Authentication authentication, String accessToken) {
        return generateToken(authentication, REFRESH_TOKEN_EXPIRE_TIME);
//        tokenService.saveOrUpdate(authentication.getName(), refreshToken, accessToken);
    }

    public String generateToken(Authentication authentication, Long expiredTime){
        Date now = new Date();
        Date expiredDate = new Date(now.getTime() + expiredTime);

        String authorities = authentication
                .getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining());
        logger.info("AUTH BEFORE TOKEN: " + authorities);
        return Jwts
                .builder()
                .subject(authentication.getName())
                .claim(KEY_ROLE, authorities)
                .issuedAt(now)
                .expiration(expiredDate)
                .signWith(secretKey, Jwts.SIG.HS512)
                .compact();
    }

    public Authentication getAuthentication(String token){
        Claims claims = parseClaims(token);
        List<SimpleGrantedAuthority> authorities = getAuthorities(claims);

        User principal = new User(claims.getSubject(), "", authorities);
        logger.info("USER PASSWORD AUTH TOKEN: {}", principal);
        return new UsernamePasswordAuthenticationToken(principal, token, authorities);
    }

    public String reIssueAccessToken(String refreshToken){
        // 리프레시 토큰 검증
        if (!validateToken(refreshToken)) return null;
        return generateAccessToken(getAuthentication(refreshToken));
    }

    public boolean validateToken(String token){
        if(!StringUtils.hasText(token)) return false;
        Claims claims = parseClaims(token);
        return claims != null && claims.getExpiration().after(new Date());
    }

    private List<SimpleGrantedAuthority> getAuthorities(Claims claims){
        return Collections
                .singletonList(new SimpleGrantedAuthority(
                        claims.get(KEY_ROLE).toString()
                ));
    }

    private Claims parseClaims(String token){
        try {
            return Jwts
                    .parser()
                    .verifyWith(secretKey)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        } catch (ExpiredJwtException e){
            return e.getClaims();
        } catch (MalformedJwtException e){
            logger.error("INVALID TOKEN");
            return null;
        } catch (SecurityException e){
            logger.error("INVALID JWT SIGNATURE");
            return null;
        }
    }

    public Cookie createCookie(String key, String token) {
        Cookie cookie = new Cookie(key, token);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        return cookie;
    }
}
