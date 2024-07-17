package com.server.todo.dto;

import com.server.todo.entity.UserEntity;
import com.server.todo.entity.UserRole;
import jakarta.security.auth.message.AuthException;
import lombok.Builder;
import org.springframework.security.crypto.keygen.KeyGenerators;

import javax.crypto.KeyGenerator;
import java.util.Map;

@Builder
public record OAuth2UserInfo(
        String nickname,
        String email,
        String gender
) {
    public static OAuth2UserInfo of(String registrationId, Map<String, Object> attrs) throws AuthException {
        return switch (registrationId) {
            case "kakao" -> ofKakao(attrs);
            default -> throw new AuthException("FAIL");
        };
    }

    private static OAuth2UserInfo ofKakao(Map<String, Object> attrs) {
        Map<String, Object> account = (Map<String, Object>) attrs.get("kakao_account");
        Map<String, Object> profile = (Map<String, Object>) attrs.get("profile");
        System.out.println(account);
        System.out.println(profile);


        return OAuth2UserInfo.builder().build();
    }

    public UserEntity toUserEntity() {
        return UserEntity
                .builder()
                .nickname(nickname)
                .email(email)
                .gender(gender)
                .userKey(KeyGenerators.string().generateKey())
                .role(UserRole.USER)
                .build();
    }
}
