package com.main.project.auth.config;

import com.main.project.auth.filter.UserJwtAuthenticationFilter;
import com.main.project.auth.filter.UserJwtVerificationFilter;
import com.main.project.auth.handler.*;
import com.main.project.auth.jwt.JwtTokenizer;
import com.main.project.auth.util.AdminCustomAuthorityUtils;
import com.main.project.auth.util.UserCustomAuthorityUtils;
import com.main.project.member.repository.RefreshTokenRepository;
import com.main.project.member.service.MemberService;
import com.main.project.member.service.RefreshTokenService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


import java.util.Arrays;

@Configuration
@EnableWebSecurity(debug = true)
public class SecurityConfiguration implements WebMvcConfigurer{
    private final JwtTokenizer jwtTokenizer;
    private final UserCustomAuthorityUtils userauthorityUtils;
    private final AdminCustomAuthorityUtils adminauthorityUtils;
    private final RefreshTokenRepository refreshTokenRepository;
    private final RefreshTokenService refreshTokenService;
    private final MemberService memberService;

    public SecurityConfiguration(JwtTokenizer jwtTokenizer,UserCustomAuthorityUtils userauthorityUtils, AdminCustomAuthorityUtils adminauthorityUtils, RefreshTokenService refreshTokenService, RefreshTokenRepository refreshTokenRepository,@Lazy MemberService memberService){
        this.jwtTokenizer = jwtTokenizer;
        this.userauthorityUtils = userauthorityUtils;
        this.adminauthorityUtils = adminauthorityUtils;
        this.refreshTokenService = refreshTokenService;
        this.refreshTokenRepository = refreshTokenRepository;
        this.memberService = memberService;
    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .oauth2Login()
                .successHandler(new OAuth2MemberSuccessHandler(jwtTokenizer, userauthorityUtils, memberService, refreshTokenRepository, refreshTokenService))
                .and()
                .csrf().disable()
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                .accessDeniedHandler(new MemberAccessDeniedHandler())
                .and()
                //.apply(new UserCustomFilterConfigurer())
                //.and()
                //.apply(new UserCustomFilterConfigurer())
                //.and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers(HttpMethod.POST, "/members").permitAll()
                        .anyRequest().permitAll()
                );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowCredentials(true);
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("*"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.addExposedHeader("Authorization");
        configuration.addExposedHeader("Refresh");
        configuration.addExposedHeader("roles");
        configuration.addExposedHeader("memberId");
        configuration.addExposedHeader("adminId");


        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**",configuration);
        return source;
    }

    public class UserCustomFilterConfigurer extends AbstractHttpConfigurer<UserCustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            UserJwtAuthenticationFilter jwtAuthenticationFilter = new UserJwtAuthenticationFilter(authenticationManager, jwtTokenizer, refreshTokenService, refreshTokenRepository, memberService);
            jwtAuthenticationFilter.setFilterProcessesUrl("/user/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            UserJwtVerificationFilter jwtVerificationFilter = new UserJwtVerificationFilter(jwtTokenizer, userauthorityUtils, refreshTokenRepository);
            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, UserJwtAuthenticationFilter.class)
                    .addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class);
        }

    }
/*
    public class AdminCustomFilterConfigurer extends AbstractHttpConfigurer<AdminCustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            AdminJwtAuthenticationFilter adminjwtAuthenticationFilter = new AdminJwtAuthenticationFilter(authenticationManager, jwtTokenizer, refreshTokenService);
            adminjwtAuthenticationFilter.setFilterProcessesUrl("/admin/login");
            adminjwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            adminjwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            AdminJwtVerificationFilter adminjwtVerificationFilter = new AdminJwtVerificationFilter(jwtTokenizer, adminauthorityUtils, refreshTokenRepository);
            builder
                    .addFilter(adminjwtAuthenticationFilter)
                    .addFilterAfter(adminjwtVerificationFilter, AdminJwtAuthenticationFilter.class);
        }

    }

 */





    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("*")
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .exposedHeaders("Authorization")
                .exposedHeaders("Refresh")
                .exposedHeaders("roles")
                .exposedHeaders("memberId")
                .exposedHeaders("adminId")
                .maxAge(3000);
    }

}
