package br.com.mv.modulo;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.ResourceProperties;
import org.springframework.boot.autoconfigure.web.WebMvcAutoConfiguration.WebMvcAutoConfigurationAdapter;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;
import org.springframework.web.servlet.resource.ContentVersionStrategy;
import org.springframework.web.servlet.resource.VersionResourceResolver;

import com.fasterxml.jackson.datatype.hibernate4.Hibernate4Module;

import lombok.extern.slf4j.Slf4j;

@EnableSpringDataWebSupport
@Configuration
@Slf4j
public class WebConfig extends WebMvcAutoConfigurationAdapter {
	
	private static final String[] SERVLET_RESOURCE_LOCATIONS = { "/" };

	private static final String[] CLASSPATH_RESOURCE_LOCATIONS = {
			"classpath:/static/" };

	private static final String[] RESOURCE_LOCATIONS;
	static {
		RESOURCE_LOCATIONS = new String[CLASSPATH_RESOURCE_LOCATIONS.length
				+ SERVLET_RESOURCE_LOCATIONS.length];
		System.arraycopy(SERVLET_RESOURCE_LOCATIONS, 0, RESOURCE_LOCATIONS, 0,
				SERVLET_RESOURCE_LOCATIONS.length);
		System.arraycopy(CLASSPATH_RESOURCE_LOCATIONS, 0, RESOURCE_LOCATIONS,
				SERVLET_RESOURCE_LOCATIONS.length, CLASSPATH_RESOURCE_LOCATIONS.length);
	}

	@Autowired
	private ResourceProperties resourceProperties = new ResourceProperties();
	
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		VersionResourceResolver versionResourceResolver = new VersionResourceResolver()
				.addVersionStrategy(new ContentVersionStrategy(), "/**");
		
		if (!this.resourceProperties.isAddMappings()) {
			log.debug("Default resource handling disabled");
			return;
		}

		Integer cachePeriod = this.resourceProperties.getCachePeriod();
		if (!registry.hasMappingForPattern("/webjars/**")) {
			registry.addResourceHandler("/webjars/**")
					.addResourceLocations("classpath:/META-INF/resources/webjars/")
					.setCachePeriod(cachePeriod)
					.resourceChain(true)
					.addResolver(versionResourceResolver);
		}
		if (!registry.hasMappingForPattern("/**")) {
			registry.addResourceHandler("/**")
					.addResourceLocations(RESOURCE_LOCATIONS)
					.setCachePeriod(cachePeriod)
					.resourceChain(true)
					.addResolver(versionResourceResolver);
		}
	}
	
	@Bean
	@Override
	public LocaleResolver localeResolver() {
		SessionLocaleResolver slr = new SessionLocaleResolver();
		slr.setDefaultLocale(new Locale("pt-BR"));
		return slr;
	}
	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(localeChangeInterceptor());
		super.addInterceptors(registry);
	}
	
	@Bean
	public LocaleChangeInterceptor localeChangeInterceptor() {
		LocaleChangeInterceptor lci = new LocaleChangeInterceptor();
		lci.setParamName("lang");
		return lci;
	}
	
	@Bean
	public MessageSource messageSource() {
		ReloadableResourceBundleMessageSource srbms = new ReloadableResourceBundleMessageSource();
		srbms.setDefaultEncoding("UTF-8");
		srbms.setBasenames("classpath:org/springframework/security/messages",
						   "classpath:org/hibernate/validator/ValidationMessages",
						   "classpath:/messagesApp/messages",
						   "classpath:/messagesSecurity/messages",
						   "classpath:/messages/messages");
		return srbms;
	}
	
	@Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        converters.add(mappingJackson2HttpMessageConverter());
        super.configureMessageConverters(converters);
    }

    @Bean
    public MappingJackson2HttpMessageConverter mappingJackson2HttpMessageConverter() {
        MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
        converter.setObjectMapper(jacksonBuilder().build());
        return converter;
    }
    
	private Jackson2ObjectMapperBuilder jacksonBuilder() {
        Jackson2ObjectMapperBuilder builder = new Jackson2ObjectMapperBuilder();
        builder.modulesToInstall(new Hibernate4Module().disable(Hibernate4Module.Feature.USE_TRANSIENT_ANNOTATION));
        builder.indentOutput(true).dateFormat(new SimpleDateFormat("dd/MM/yyyy"));
        return builder;
    }
}