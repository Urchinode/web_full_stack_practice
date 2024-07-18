package com.server.todo.dto;

import com.server.todo.entity.UserEntity;
import com.server.todo.entity.UserRole;
import jakarta.security.auth.message.AuthException;
import lombok.Builder;
import org.springframework.security.crypto.keygen.KeyGenerators;

import java.text.MessageFormat;
import java.util.Map;

@Builder
public record OAuth2UserInfo(
        String nickname,
        String email,
        String gender
) {
    @Override
    public String toString() {
        return MessageFormat.format("NICKNAME: {0}, EMAIL: {1}, GENDER: {2}", nickname, email, gender);
    }

    public static OAuth2UserInfo of(String registrationId, Map<String, Object> attrs) throws AuthException {
        return switch (registrationId) {
            case "id" -> ofKakao(attrs);
            default -> throw new AuthException("FAIL");
        };
    }

    private static OAuth2UserInfo ofKakao(Map<String, Object> attrs) {
        Map<String, Object> account = (Map<String, Object>) attrs.get("kakao_account");
        System.out.println(account);
        String nickname = (String) ((Map<String, Object>) account.get("profile")).get("nickname");
        String email = (String) account.get("email");
        String gender = (String) account.get("gender");

        return OAuth2UserInfo
                .builder()
                .nickname(nickname)
                .email(email)
                .gender(gender)
                .build();
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
