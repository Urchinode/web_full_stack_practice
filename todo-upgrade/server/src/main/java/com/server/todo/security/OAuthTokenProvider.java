package com.server.todo.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecurityException;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class OAuthTokenProvider {
    @Value("${jwt.secret-key}")
    private String key;
    private SecretKey secretKey;
    private static final Long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 30L;
    private static final Long REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 24 * 10L;
    private static final String KEY_ROLE = "role";
    //private final TokenService tokenService;

    @PostConstruct
    private void setUpSecretKey(){
        secretKey = Keys.hmacShaKeyFor(key.getBytes());
    }

    public String generateAccessToken(Authentication authentication){
        return generateToken(authentication, ACCESS_TOKEN_EXPIRE_TIME);
    }

    public String generateRefreshToken(Authentication authentication){
        return generateToken(authentication, REFRESH_TOKEN_EXPIRE_TIME);
        // tokenService.registerToken(authentication.getName(), refreshToken, accessToken); // Redis
    }

    public String generateToken(Authentication authentication, Long expiredTime){
        Date now = new Date();
        Date expiredDate = new Date(now.getTime() + expiredTime);

        String authorities = authentication
                .getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining());

        return Jwts
                .builder()
                .subject(authentication.getName())
                .claim(KEY_ROLE, authorities)
                .issuedAt(now)
                .expiration(expiredDate)
                .signWith(secretKey, Jwts.SIG.HS512)
                .compact();
    }

    public Authentication getAuthentication(String token) throws Exception {
        Claims claims = parseClaims(token);
        List<SimpleGrantedAuthority> authorities = getAuthorities(claims);

        User principal = new User(claims.getSubject(), "", authorities);
        return new UsernamePasswordAuthenticationToken(principal, token, authorities);
    }

    // TODO
    public String reIssueAccessToken(String accessToken){
        return null;
    }

    public boolean validateToken(String token) throws Exception {
        if(!StringUtils.hasText(token)) return false;
        Claims claims = parseClaims(token);
        return claims.getExpiration().after(new Date());
    }

    private List<SimpleGrantedAuthority> getAuthorities(Claims claims){
        return Collections
                .singletonList(new SimpleGrantedAuthority(
                        claims.get(KEY_ROLE).toString()
                ));
    }

    private Claims parseClaims(String token) throws Exception{
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
            throw new Exception("INVALID TOKEN");
        } catch (SecurityException e){
            throw new Exception("INVALID JWT SIGNATURE");
        }
    }
}
