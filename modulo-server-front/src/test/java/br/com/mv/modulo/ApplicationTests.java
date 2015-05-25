package br.com.mv.modulo;

import static org.junit.Assert.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Test;
import org.springframework.http.HttpStatus;

public class ApplicationTests extends TestsConfig {

	@Test
	public void testHome() throws Exception {
		mockMvc.perform(get("/"))
        	   .andExpect(status().isFound());
	}
	
	@Test
	public void testResources() throws Exception {
		setHostSuffix("/lib/bootstrap/dist/css/bootstrap.min.css");
		assertEquals(HttpStatus.OK, getReturnStatus());
		setHostSuffix("/css/menu.css");
		assertEquals(HttpStatus.OK, getReturnStatus());
		setHostSuffix("/lib/jquery/dist/jquery.min.js");
		assertEquals(HttpStatus.OK, getReturnStatus());
		setHostSuffix("/components/components.js");
		assertEquals(HttpStatus.OK, getReturnStatus());
	}
}