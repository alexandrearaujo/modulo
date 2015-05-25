package br.com.mv.modulo.web;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestBuilders.formLogin;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.security.test.web.servlet.response.SecurityMockMvcResultMatchers.authenticated;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.redirectedUrl;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import br.com.mv.modulo.TestsConfig;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class LoginControllerTests extends TestsConfig {
	
	@Test
	public void testLoginGet() throws Exception {
		mockMvc.perform(get("/login"))
			   .andExpect(status().isOk())
			   .andExpect(view().name("login"));
	}
	
	@Test
	public void testLoginPostWithADM() throws Exception {
		mockMvc.perform(formLogin().user(ADMIN_USER_NAME).password(ADMIN_PASSWORD))
			   .andExpect(authenticated().withUsername(ADMIN_USER_NAME))
			   .andExpect(redirectedUrl("/login/selectVinculo"));
	}
	
//	@Test
//	public void testSelectVinculo() throws Exception {	
//		mockMvc.perform(get("/login/selectVinculo").with(user(ADMIN_USER_NAME)))
//	           .andExpect(status().isFound())
//	           .andExpect(redirectedUrl("/"))
//	           .andExpect(authenticated().withUsername(ADMIN_USER_NAME));
//	}
	
	@Test
    public void withUserSuccess() throws Exception {
		mockMvc.perform(get("/").with(user(ADMIN_USER_NAME)))
               .andExpect(status().isOk())
               .andExpect(view().name("index"))
               .andExpect(authenticated().withUsername(ADMIN_USER_NAME));
    }
	
}