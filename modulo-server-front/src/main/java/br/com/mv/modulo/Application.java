package br.com.mv.modulo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.WebMvcAutoConfiguration.WebMvcAutoConfigurationAdapter;
import org.springframework.boot.orm.jpa.EntityScan;
import org.springframework.data.jpa.domain.support.Jsr310JpaConverters;
import org.springframework.data.web.config.EnableSpringDataWebSupport;

import br.com.mv.geral.model.User;
import br.com.mv.modulo.model.TipoFrequencia;

@SpringBootApplication
@EnableSpringDataWebSupport
@EntityScan(basePackageClasses = { TipoFrequencia.class, Jsr310JpaConverters.class, User.class })
public class Application extends WebMvcAutoConfigurationAdapter {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
