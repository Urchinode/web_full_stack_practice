package com.server.todo.security;

import com.server.todo.entity.UserEntity;
import org.slf4j.Logger;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2UserAuthority;

import java.util.Collection;
import java.util.List;
import java.util.Map;

public record PrincipalDetails(
        UserEntity user,
        Map<String, Object> attrs,
        String attrKey
) implements OAuth2User, UserDetails {

    private final static Logger logger = com.server.todo.utils.Logger.getLogger(PrincipalDetails.class);

    @Override
    public String getPassword() {
        return "";
    }

    @Override
    public String getUsername() {
        return user.getUserKey();
    }

    @Override
    public Map<String, Object> getAttributes() {
        logger.info("PRINCIPAL ATTRIBUTES: " + attrs);
        return attrs;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new OAuth2UserAuthority(user.getRole().getKey(), attrs));
    }

    @Override
    public String getName() {
        return attrs.get(attrKey).toString();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
