package com.server.todo.security;

import com.server.todo.service.KakaoOAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final KakaoOAuth2UserService kakaoOAuth2UserService;
    private final KakaoOAuth2LoginSuccessHandler kakaoOAuth2LoginSuccessHandler;

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer(){
        return web -> web.ignoring()
                .requestMatchers("/error", "/favicon.ico");
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .cors(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .logout(AbstractHttpConfigurer::disable)
                .headers(hc -> hc.frameOptions(
                        HeadersConfigurer.FrameOptionsConfig::disable).disable()
                )
                .sessionManagement(c -> c.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(request ->
                        request.requestMatchers("/", "/kakao-login", "/oauth2/callback/kakao").permitAll()
                                .anyRequest().authenticated())
                // 인증 요청을 하면 내부 객체가 동작
                // 인증 완료시 콜백 URL로 인증 코드를 전달
                // 이후 OAuth..Filter가 인증 코드를 처리하여 토큰을 교환한다.
                // OAuthProvider가 토큰을 이용해 사용자 정보를 가져온다. 이때, OAuthUserService가 호출된다.
                // Service를 이용해 OAuth2User를 생성한다.
                // 성패에 따른 핸들러가 동작한다.
                .oauth2Login(oauth ->
                        oauth.userInfoEndpoint(c -> c.userService(kakaoOAuth2UserService))
                                .successHandler(kakaoOAuth2LoginSuccessHandler));
        return http.build();
    }
}
