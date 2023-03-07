package br.com.listit.listit.web.security;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;


@Configuration
public class CorsConfig {

	    @Bean
	    public FilterRegistrationBean<CorsFilter> corsFilter() {
	        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

	        CorsConfiguration configAutenticacao = new CorsConfiguration();
	        configAutenticacao.setAllowCredentials(true);
	        configAutenticacao.addAllowedHeader("Authorization");
	        configAutenticacao.addAllowedHeader("Content-Type");
	        configAutenticacao.addAllowedHeader("Accept");
	        configAutenticacao.addAllowedMethod("POST");
	        configAutenticacao.addAllowedMethod("GET");
	        configAutenticacao.addAllowedMethod("DELETE");
	        configAutenticacao.addAllowedMethod("PUT");
	        configAutenticacao.addAllowedMethod("OPTIONS");
	        configAutenticacao.setMaxAge(3600L);
	        // source.registerCorsConfiguration("/oauth/token", configAutenticacao);
	        source.registerCorsConfiguration("/**", configAutenticacao); // Global para todas as URLs da aplicação

	        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean<CorsFilter>(new CorsFilter(source));
			
	        filterRegistrationBean.setOrder(Ordered.HIGHEST_PRECEDENCE);
	        return filterRegistrationBean;
	    }
}
