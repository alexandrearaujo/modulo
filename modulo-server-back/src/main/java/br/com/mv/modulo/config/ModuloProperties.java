package br.com.mv.modulo.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.Setter;

@ConfigurationProperties(prefix = "application")
@Getter @Setter
public class ModuloProperties {

	private String reportPrintServerURI;

}
