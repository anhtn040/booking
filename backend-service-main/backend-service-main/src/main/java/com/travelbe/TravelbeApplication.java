package com.travelbe;

import com.travelbe.config.security.CordConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.util.TimeZone;

@SpringBootApplication
public class TravelbeApplication {

	CordConfig cordConfig;

	public static void main(String[] args) {
		SpringApplication.run(TravelbeApplication.class, args);

		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
	}

//	@Bean
//	public WebMvcConfigurer corsConfigurer() {
//		return new WebMvcConfigurer() {
//			@Override
//			public void addCorsMappings(@NonNull CorsRegistry registry) {
//				registry.addMapping("/**")
//						.allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH")
//						.allowedOrigins("*")
//						.allowedHeaders("*")
//						.exposedHeaders("Authorization");
//			}
//		};
//	}
}
