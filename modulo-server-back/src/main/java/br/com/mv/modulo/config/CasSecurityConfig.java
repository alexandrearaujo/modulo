package br.com.mv.modulo.config;

import java.util.Arrays;

import org.jasig.cas.client.session.SingleSignOutFilter;
import org.jasig.cas.client.validation.Cas20ServiceTicketValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.cas.ServiceProperties;
import org.springframework.security.cas.authentication.CasAssertionAuthenticationToken;
import org.springframework.security.cas.authentication.CasAuthenticationProvider;
import org.springframework.security.cas.web.CasAuthenticationEntryPoint;
import org.springframework.security.cas.web.CasAuthenticationFilter;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.AuthenticationUserDetailsService;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy;
import org.springframework.security.web.authentication.session.SessionFixationProtectionStrategy;
import org.springframework.security.web.header.writers.frameoptions.WhiteListedAllowFromStrategy;
import org.springframework.security.web.header.writers.frameoptions.XFrameOptionsHeaderWriter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import br.com.mv.modulo.business.CustomUserDetailsService;

@EnableWebSecurity
@Configuration
@EnableConfigurationProperties({CasProperties.class, ModuloProperties.class})
@Profile(ModuloProfiles.CAS)
public class CasSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private CasProperties casProperties;
	
	@Autowired
	private ModuloProperties moduloProperties;
	
	
	@Override
	public void configure(WebSecurity web) throws Exception {
		web
		 .ignoring()
			 .antMatchers("/css/**")
			 .antMatchers("/components/**")
			 .antMatchers("/app/**")
			 .antMatchers("/img/**")
			 .antMatchers("/lib/**")
			 .antMatchers("/externo/**");
	}
	
    @Override
    protected void configure(HttpSecurity http) throws Exception {
    	
    	http
         .authorizeRequests()
//             .antMatchers("/css/**").permitAll()
//             .antMatchers("/components/**").permitAll()
//             .antMatchers("/app/**").permitAll()
//             .antMatchers("/img/**").permitAll()
//             .antMatchers("/lib/**").permitAll()
//             .antMatchers("/webjars/**").permitAll()
//             .antMatchers("/externo/**").permitAll()
             .anyRequest().authenticated()
             .and()
//         .formLogin()
//             .loginPage("/login")
//             .defaultSuccessUrl("/login/selectVinculo", true)
//             .permitAll()
//             .and()
         .addFilter(casAuthenticationFilter())
//         .logout()
//         	 .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
//         	 .and()
         .addFilterBefore(requestCasGlobalLogoutFilter(), LogoutFilter.class)
         .exceptionHandling()
         	 .authenticationEntryPoint(casAuthenticationEntryPoint())
//         	 .accessDeniedPage("/access")
         	 .and()
		 .headers()
		 	 .addHeaderWriter(new XFrameOptionsHeaderWriter(new WhiteListedAllowFromStrategy(Arrays.asList(moduloProperties.getExternalServersWhiteListedAllowFrames()))));
    	
        
        /**
		 * <logout invalidate-session="true" delete-cookies="JSESSIONID" />
		 */
		http.logout().logoutUrl("/logout").logoutSuccessUrl("/").invalidateHttpSession(true)
				.deleteCookies("JSESSIONID");
        
    }
    
//	@Override
//	protected void configure(HttpSecurity http) throws Exception {
//		http.addFilterAfter(new CsrfCookieGeneratorFilter(), CsrfFilter.class).exceptionHandling()
//				.authenticationEntryPoint(casAuthenticationEntryPoint()).and().addFilter(casAuthenticationFilter())
//				.addFilterBefore(singleSignOutFilter(), CasAuthenticationFilter.class)
//				.addFilterBefore(requestCasGlobalLogoutFilter(), LogoutFilter.class);
//
//		http.headers().frameOptions().disable().authorizeRequests().antMatchers("/").permitAll()
//				.antMatchers("/login", "/logout", "/secure").authenticated().antMatchers("/filtered")
//				.hasAuthority(AuthoritiesConstants.ADMIN).anyRequest().authenticated();
//
//		/**
//		 * <logout invalidate-session="true" delete-cookies="JSESSIONID" />
//		 */
//		http.logout().logoutUrl("/logout").logoutSuccessUrl("/").invalidateHttpSession(true)
//				.deleteCookies("JSESSIONID");
//
//		// http.csrf();
//	}
    
 
    @Override
    protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(buildCasAuthenticationProvider());
        super.configure(auth);
    }
    
    @Bean
	public CasAuthenticationProvider buildCasAuthenticationProvider() {
		final CasAuthenticationProvider casAuthenticationProvider = new CasAuthenticationProvider();
		casAuthenticationProvider.setAuthenticationUserDetailsService(customUserDetailsService());
		casAuthenticationProvider.setServiceProperties(serviceProperties());
		casAuthenticationProvider.setTicketValidator(cas20ServiceTicketValidator());
		casAuthenticationProvider.setKey("an_id_for_this_auth_provider_only");
		return casAuthenticationProvider;
	}
    
//	@Bean
//	public PreAuthenticatedAuthenticationProvider preAuthAuthProvider() {
//		PreAuthenticatedAuthenticationProvider preAuthenticatedAuthenticationProvider = new PreAuthenticatedAuthenticationProvider();
//		preAuthenticatedAuthenticationProvider.setPreAuthenticatedUserDetailsService(customUserDetailsService());
//	}
    
    @Bean
    public AuthenticationUserDetailsService<CasAssertionAuthenticationToken> customUserDetailsService() {
        return new CustomUserDetailsService();
    }
    
    @Bean
    public ServiceProperties serviceProperties() {
        ServiceProperties serviceProperties = new ServiceProperties();
        serviceProperties.setService(casProperties.getAppServiceSecurity());
        serviceProperties.setSendRenew(false);
        return serviceProperties;
    }
    
    @Bean
	public Cas20ServiceTicketValidator cas20ServiceTicketValidator() {
    	Cas20ServiceTicketValidator cas20ServiceTicketValidator = new Cas20ServiceTicketValidator(casProperties.getServerUrlPrefix());
		return cas20ServiceTicketValidator;
	}
    
    @Bean
	public CasAuthenticationFilter casAuthenticationFilter() throws Exception {
		CasAuthenticationFilter casAuthenticationFilter = new CasAuthenticationFilter();
		casAuthenticationFilter.setFilterProcessesUrl("/j_spring_cas_security_check");
		casAuthenticationFilter.setAuthenticationManager(authenticationManager());
		casAuthenticationFilter.setSessionAuthenticationStrategy(sessionStrategy());
		return casAuthenticationFilter;
	}
    
//    @Bean
//    public Cas20ProxyReceivingTicketValidationFilter casValidationFilter() {
//    	Cas20ProxyReceivingTicketValidationFilter cas20ProxyReceivingTicketValidationFilter = new Cas20ProxyReceivingTicketValidationFilter();
//    	cas20ProxyReceivingTicketValidationFilter.setServerName(casProperties.getAppServiceHome());
//    	cas20ProxyReceivingTicketValidationFilter.setExceptionOnValidationFailure(true);
//    	cas20ProxyReceivingTicketValidationFilter.setRedirectAfterValidation(true);
//    	cas20ProxyReceivingTicketValidationFilter.setTicketValidator(cas20ServiceTicketValidator());
//    	return cas20ProxyReceivingTicketValidationFilter;
//    }
    
    @Bean
	public SessionAuthenticationStrategy sessionStrategy() {
		SessionAuthenticationStrategy sessionStrategy = new SessionFixationProtectionStrategy();
		return sessionStrategy;
	}

    
    @Bean
	public CasAuthenticationEntryPoint casAuthenticationEntryPoint() {
		CasAuthenticationEntryPoint casAuthenticationEntryPoint = new CasAuthenticationEntryPoint();
		casAuthenticationEntryPoint.setLoginUrl(casProperties.getServerUrlLogin());
		casAuthenticationEntryPoint.setServiceProperties(serviceProperties());
		return casAuthenticationEntryPoint;
	}
	
    @Bean
	public SingleSignOutFilter singleSignOutFilter() {
		SingleSignOutFilter singleSignOutFilter = new SingleSignOutFilter();
//		singleSignOutFilter.setCasServerUrlPrefix(casProperties.getServerUrlPrefix());
		return singleSignOutFilter;
	}

	@Bean
	public LogoutFilter requestCasGlobalLogoutFilter() {
		LogoutFilter logoutFilter = new LogoutFilter(casProperties.getUrlLogout() + "?service="	+ casProperties.getAppServiceHome(), new SecurityContextLogoutHandler());
	    logoutFilter.setFilterProcessesUrl("/logout");
		logoutFilter.setFilterProcessesUrl("/j_spring_cas_security_logout");
		logoutFilter.setLogoutRequestMatcher(new AntPathRequestMatcher("/logout"));
		return logoutFilter;
	}

}
