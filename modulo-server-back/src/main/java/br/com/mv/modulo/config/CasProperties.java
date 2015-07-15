package br.com.mv.modulo.config;

import javax.validation.constraints.NotNull;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.Setter;

@ConfigurationProperties(prefix = "cas")
@Getter @Setter
public class CasProperties {

	@NotNull
	private String serverUrlPrefix;
	
	@NotNull
	private String serverUrlLogin;
	
	private String urlLogout;
	
	private String appServiceSecurity;
	private String appServiceHome;

}
