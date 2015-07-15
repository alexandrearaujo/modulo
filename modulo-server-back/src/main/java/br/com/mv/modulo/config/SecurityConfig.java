package br.com.mv.modulo.config;

import java.util.Arrays;

import javax.annotation.Nonnull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.authentication.dao.ReflectionSaltSource;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.header.writers.frameoptions.WhiteListedAllowFromStrategy;
import org.springframework.security.web.header.writers.frameoptions.XFrameOptionsHeaderWriter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import br.com.mv.geral.controleacesso.authentication.util.PasswordEncoderImpl;
import br.com.mv.modulo.business.UserBusiness;

@EnableWebSecurity
@Configuration
@EnableConfigurationProperties(ModuloProperties.class)
@Profile(ModuloProfiles.DEFAULT)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
    private UserBusiness userBusiness;
	
	@Autowired
	private ModuloProperties moduloProperties;
	
	
	@Override
    protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(buildDaoAuthenticationProvider());
    }
	
	@Nonnull
    private DaoAuthenticationProvider buildDaoAuthenticationProvider() {
        final DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(final String username) {
                return userBusiness.findByLogin(username);
            }
        });
        
        ReflectionSaltSource reflectionSaltSource = new ReflectionSaltSource();
        reflectionSaltSource.setUserPropertyToUse("salt");
        daoAuthenticationProvider.setSaltSource(reflectionSaltSource);
        daoAuthenticationProvider.setPasswordEncoder(new PasswordEncoderImpl());
        return daoAuthenticationProvider;
    }
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		 http
         .authorizeRequests()
             .antMatchers("/css/**").permitAll()
             .antMatchers("/components/**").permitAll()
             .antMatchers("/app/**").permitAll()
             .antMatchers("/img/**").permitAll()
             .antMatchers("/lib/**").permitAll()
             .antMatchers("/webjars/**").permitAll()
             .antMatchers("/externo/**").permitAll()
             .anyRequest().authenticated()
             .and()
         .formLogin()
             .loginPage("/login")
             .defaultSuccessUrl("/login/selectVinculo", true)
             .permitAll()
             .and()
         .logout()
         	 .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
         	 .and()
         .exceptionHandling()
         	 .accessDeniedPage("/access")
         	 .and()
		 .headers()
		 	 .addHeaderWriter(new XFrameOptionsHeaderWriter(new WhiteListedAllowFromStrategy(Arrays.asList(moduloProperties.getExternalServersWhiteListedAllowFrames()))));
	}
}