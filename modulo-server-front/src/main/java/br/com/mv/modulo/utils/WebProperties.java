package br.com.mv.modulo.utils;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.Setter;

@ConfigurationProperties(prefix = "web")
@Getter @Setter
public class WebProperties {
	
	private String[] classpathResourceLocations;

}
