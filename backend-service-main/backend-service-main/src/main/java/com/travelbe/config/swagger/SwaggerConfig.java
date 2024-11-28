package com.travelbe.config.swagger;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
  info = @Info(
    title = "Travel Web App API",
    version = "1.0.0",
    description = "Backend for travel booking",
    contact = @Contact(
      name = "Nguyễn Thanh Sang",
      email = "sangdoannguyen7@gmail.com"
    )
  )
)
public class SwaggerConfig {
//
//    @Bean
//    public OpenAPI customSwagger() {
//
//
//        return new OpenAPI()
////                .info(info)
////                .servers(List.of(devServer, prodServer))
//                .externalDocs(new ExternalDocumentation()
//                        .description("Travel app config")
//                        .url("http://localhost:8000/swagger-ui/index.html"))
//                .components(new Components()
//                        .addSecuritySchemes("bearer-key",
//                                new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT"))
//                        .addSecuritySchemes("SystemKey",
//                                new SecurityScheme().type(SecurityScheme.Type.APIKEY).in(SecurityScheme.In.HEADER).name("Authorization"))
//                        .addParameters("property-id", new Parameter()
//                                .in("header")
//                                .name("Authorization")
//                                .schema(new StringSchema())
//                                .required(false))
//                );
//    }
}
