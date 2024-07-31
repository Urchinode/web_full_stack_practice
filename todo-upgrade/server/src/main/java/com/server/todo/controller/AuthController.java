package com.server.todo.controller;

import com.server.todo.security.TokenKey;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;

@Tag(name = "Auth", description = "인증 관련")
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    @PostMapping("/logout")
    public ResponseEntity<?> logOut(HttpServletRequest request, HttpServletResponse response) {
        for (Cookie cookie: request.getCookies()){
            if (isTokenCookie(cookie.getName())){
                Cookie deletedCookie = new Cookie(cookie.getName(), null);
                deletedCookie.setPath("/");
                deletedCookie.setMaxAge(0);
                response.addCookie(deletedCookie);
            }
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    private boolean isTokenCookie(String cookieName){
        return Arrays.asList(
                TokenKey.ACCESS_TOKEN.getName(), TokenKey.REFRESH_TOKEN.getName()
        ).contains(cookieName);
    }
}
