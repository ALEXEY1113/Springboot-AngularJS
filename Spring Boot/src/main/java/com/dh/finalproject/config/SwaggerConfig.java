package com.dh.finalproject.config;

import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * Created by ALEXEY on 6/16/2017.
 */
@Configuration
@EnableSwagger2
public class SwaggerConfig {

    public SwaggerConfig() {
    }

    public Docket productApi() {
        return (new Docket(DocumentationType.SWAGGER_2))
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.dh.finalproject.web"))
                .paths(PathSelectors.any())
                .build()
                .apiInfo(this.apiInfo())
                .useDefaultResponseMessages(false);
    }

    private ApiInfo apiInfo() {
        return new ApiInfo(
                "My REST API",
                "this is an API",
                "1.0",
                "urn:tos",
                ApiInfo.DEFAULT_CONTACT,
                "Apache 2.0",
                "http");
    }
}
