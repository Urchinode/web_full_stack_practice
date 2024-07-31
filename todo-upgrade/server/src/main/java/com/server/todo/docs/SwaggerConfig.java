package com.server.todo.docs;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.OAuthFlow;
import io.swagger.v3.oas.models.security.OAuthFlows;
import io.swagger.v3.oas.models.security.Scopes;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    @Value("${KAKAO_AUTH_REQ_URL}")
    private String KAKAO_AUTH_REQ_URL;

    @Value("${KAKAO_TOKEN_URI}")
    private String KAKAO_TOKEN_URI;

    @Value(("${TERMS_OF_SERVICE_URL}"))
    private String TERMS_OF_SERVICE_URL;

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .components(components())
                .info(apiInfo());
    }

    private Info apiInfo() {
        return new Info()
                .title("Todo List API")
                .description("Test TODO")
                .version("v1.0.0")
                .termsOfService(TERMS_OF_SERVICE_URL);
    }

    private Components components() {
        return new Components()
                .addSecuritySchemes("카카오 로그인",
                        new SecurityScheme()
                                .name("kakaoLogin")
                                .description("로그인하세요")
                                .type(SecurityScheme.Type.OAUTH2)
                                .in(SecurityScheme.In.COOKIE)
                                .flows(oAuthFlows()));
    }

    private OAuthFlows oAuthFlows() {
        return new OAuthFlows()
                .authorizationCode(kakaoOAuthFlow());
    }

    private OAuthFlow kakaoOAuthFlow() {
        return new OAuthFlow()
                .authorizationUrl(KAKAO_AUTH_REQ_URL)
                .tokenUrl(KAKAO_TOKEN_URI)
                .scopes(
                        new Scopes()
                                .addString("profile_nickname", "별명")
                                .addString("account_email", "이메일")
                                .addString("gender", "성별")
                );
    }
}
