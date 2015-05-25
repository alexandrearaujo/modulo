package br.com.mv.modulo;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;

import org.apache.commons.lang3.StringUtils;
import org.junit.After;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.openqa.selenium.WebDriver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.TestRestTemplate;
import org.springframework.boot.test.WebIntegrationTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.htmlunit.MockMvcWebClientBuilder;
import org.springframework.test.web.servlet.htmlunit.webdriver.MockMvcHtmlUnitDriverBuilder;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.WebApplicationContext;

import com.gargoylesoftware.htmlunit.WebClient;


@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebIntegrationTest("server.port:8080")
public abstract class TestsConfig {
	
	@Autowired
	private WebApplicationContext webContext;
	
	protected MockMvc mockMvc;

	protected WebClient webClient;
	
	protected WebDriver webDriver;
	
	protected RestTemplate template;
	
	protected final static String ADMIN_USER_NAME = "ADM";
	protected final static String ADMIN_PASSWORD = "SPOAEN";

	@Before
    public void setup(){
        MockitoAnnotations.initMocks(this);
        
        mockMvc = MockMvcBuilders
	              .webAppContextSetup(webContext)
	              .apply(springSecurity())
	              .build();
        
		webClient = MockMvcWebClientBuilder
					.mockMvcSetup(mockMvc)
					.contextPath(contextPath)
					.createWebClient();
		
		webDriver = MockMvcHtmlUnitDriverBuilder
				    .mockMvcSetup(mockMvc)
				    .contextPath(contextPath)
				    .createDriver();
		
		template = new TestRestTemplate();
    }

	@After
	public void cleanup() {
		webClient.close();
		webDriver.close();
	}
	
	@Value("${server.port}")
	protected int port;

	@Value("${server.context-path}")
	protected String contextPath;

	private String hostSuffix;

	protected static Authentication authentication;

	protected HttpStatus getReturnStatus() {
		return getResponseEntity().getStatusCode();
	}

	protected ResponseEntity<String> getResponseEntity() {
		return template.getForEntity(getHost(), String.class);
	}

	protected String getHost() {
		String homeHost = "http://localhost:" + this.port + contextPath;
		if (StringUtils.isNoneBlank(hostSuffix)) {
			return homeHost + hostSuffix;
		} else {
			return homeHost;
		}
	}

	protected String getHostSuffix() {
		return hostSuffix;
	}

	protected void setHostSuffix(String hostSuffix) {
		this.hostSuffix = hostSuffix;
	}
}