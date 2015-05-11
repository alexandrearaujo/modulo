package br.com.mv.modulo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.WebMvcAutoConfiguration.WebMvcAutoConfigurationAdapter;
import org.springframework.boot.orm.jpa.EntityScan;
import org.springframework.data.web.config.EnableSpringDataWebSupport;

@SpringBootApplication
@EnableSpringDataWebSupport
@EntityScan({"org.springframework.data.jpa.domain.support", "br.com.mv.geral.model", "br.com.mv.modulo.model"})
public class Application extends WebMvcAutoConfigurationAdapter {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
