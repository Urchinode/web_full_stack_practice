package com.server.todo.controller;

import com.server.todo.entity.UserEntity;
import com.server.todo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class LoginController {
    private final UserRepository userRepository;

    @GetMapping("/kakao-login")
    public Optional<UserEntity> getInfo(@AuthenticationPrincipal UserDetails userDetails) throws Exception {
//        return code;
        return userRepository.findByUserKey(userDetails.getUsername());
    }

    // 카카오 로그인 경로
    @GetMapping("/oauth2/authorization/kakao")
    public void loginToKakao() {

    }
}
