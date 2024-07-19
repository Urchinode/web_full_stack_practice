package com.server.todo.controller;

import com.server.todo.entity.UserEntity;
import com.server.todo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class LoginController {
    private final UserRepository userRepository;
    @GetMapping("/kakao-login")
    public Optional<UserEntity> getInfo(@AuthenticationPrincipal UserDetails userDetails) throws Exception {
        return userRepository.findByUserKey(userDetails.getUsername());
    }
}
