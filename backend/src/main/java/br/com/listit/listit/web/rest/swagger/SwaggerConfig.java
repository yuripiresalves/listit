package br.com.listit.listit.web.rest.swagger;

import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

@Configuration
@OpenAPIDefinition(info = @Info(
        title = "ListIt back-end",
        version = "1.0",
        description = "api rest pfor listit website"
))
public class SwaggerConfig {

}
