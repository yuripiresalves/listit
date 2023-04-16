package br.com.listit.listit.web.rest.swagger;

import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;

@Configuration
@OpenAPIDefinition(info = @Info(
        title = "ListIt back-end",
        version = "1.0",
        description = "api rest pfor listit website"
))
@SecurityScheme(
		  name = "Bearer Authentication",
		  type = SecuritySchemeType.HTTP,
		  bearerFormat = "JWT",
		  scheme = "bearer"
		)
public class SwaggerConfig {

}
