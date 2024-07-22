package com.server.todo.security;

import com.server.todo.service.CustomOAuth2UserService;
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
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final TokenExceptionFilter tokenExceptionFilter;
    private final TokenAuthenticationFilter tokenAuthenticationFilter;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final CustomLoginSuccessHandler customLoginSuccessHandler;

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return web -> web.ignoring()
                .requestMatchers("/error", "/favicon.ico");
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .httpBasic(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .logout(AbstractHttpConfigurer::disable)
                .headers(hc -> hc.frameOptions(
                        HeadersConfigurer.FrameOptionsConfig::disable).disable()
                )
                .sessionManagement(c -> c.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(request ->
                        request.requestMatchers("/").permitAll()
                                .anyRequest().authenticated())
                // 인증 요청을 하면 내부 객체가 동작
                // 인증 완료시 콜백 URL로 인증 코드를 전달
                // 이후 OAuth..Filter가 인증 코드를 처리하여 토큰을 교환한다.
                // OAuthProvider가 토큰을 이용해 사용자 정보를 가져온다. 이때, OAuthUserService가 호출된다.
                // Service를 이용해 OAuth2User를 생성한다.
                // 성패에 따른 핸들러가 동작한다.
                .oauth2Login(oauth ->
                        oauth.userInfoEndpoint(c -> c.userService(customOAuth2UserService))
                                .successHandler(customLoginSuccessHandler))
                .addFilterBefore(tokenAuthenticationFilter, OAuth2LoginAuthenticationFilter.class)
                .addFilterBefore(tokenExceptionFilter, TokenAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowCredentials(true);
        config.addAllowedOriginPattern("http://localhost:*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        config.addExposedHeader("Authorization");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);

    }
}
