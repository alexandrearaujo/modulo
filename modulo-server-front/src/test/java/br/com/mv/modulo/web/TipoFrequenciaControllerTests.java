package br.com.mv.modulo.web;

import static org.junit.Assert.assertEquals;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;
import static org.junit.Assert.assertThat;

import java.util.Date;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;

import br.com.mv.modulo.TestsConfig;
import br.com.mv.modulo.model.TipoFrequencia;
import br.com.mv.modulo.model.type.EnumTipoMensagem;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class TipoFrequenciaControllerTests extends TestsConfig {
	
	private static TipoFrequencia tipoFrequencia;
	
	@Test
	public void test01ToList() throws Exception {
		MvcResult result = mockMvc.perform(get("/tipoFrequencia/list").with(user("ADM")))
							      .andExpect(status().isOk())
							      .andExpect(model().attributeExists("tipoFrequencia"))
							      .andExpect(view().name("tipoFrequencia/tipoFrequenciaList"))
							      .andReturn();
		tipoFrequencia = (TipoFrequencia) result.getModelAndView().getModelMap().get("tipoFrequencia");
	}
	
	@Test
	public void test02FindTipoFrequenciaWithEmptyTipoFrequencia() throws Exception {
		mockMvc.perform(post("/tipoFrequencia/list")
			   .contentType(MediaType.APPLICATION_FORM_URLENCODED)
			   .sessionAttr("tipoFrequencia", tipoFrequencia)
			   .with(user("ADM"))
			   .with(csrf()))
			   .andExpect(status().isOk())
			   .andExpect(model().attributeExists("page"))
			   .andExpect(view().name("tipoFrequencia/tipoFrequenciaList"));
	}
	
	@Test
	public void test03FindTipoFrequenciaWithNoArguments() throws Exception {
		MvcResult result = mockMvc.perform(post("/tipoFrequencia/list")
								  .contentType(MediaType.APPLICATION_FORM_URLENCODED)
								  .with(user("ADM"))
								  .with(csrf()))
								  .andReturn();
		assertEquals(result.getResolvedException().getMessage(), "Expected session attribute 'tipoFrequencia'");
	}
	
	@Test(expected=IllegalArgumentException.class)
	public void test04FindTipoFrequenciaWithNullArguments() throws Exception {
		mockMvc.perform(post("/tipoFrequencia/list")
			   .contentType(MediaType.APPLICATION_FORM_URLENCODED)
			   .sessionAttr("tipoFrequencia", null)
			   .with(user("ADM"))
			   .with(csrf()));
	}
	
	@Test
	public void test05AddHorarioMedicacao() throws Exception  {
		createTipoFrequenciaTest();
		MvcResult result = mockMvc.perform(post("/tipoFrequencia/save")
								  .contentType(MediaType.APPLICATION_FORM_URLENCODED)
								  .sessionAttr("tipoFrequencia", tipoFrequencia)
								  .param("adicionarHorarioMedicacao", "adicionarHorarioMedicacao")
								  .with(user("ADM"))
								  .with(csrf()))
								  .andExpect(status().isOk())
								  .andExpect(model().attributeExists("tipoFrequencia"))
								  .andExpect(view().name("tipoFrequencia/tipoFrequenciaForm"))
								  .andReturn();
		tipoFrequencia = (TipoFrequencia) result.getModelAndView().getModelMap().get("tipoFrequencia");
		assertThat(tipoFrequencia.getDetalhes(), not(empty()));
		assertThat(tipoFrequencia.getDetalhes(), hasSize(5));
	}
	
	@Test
	public void test06Save() throws Exception  {
		mockMvc.perform(post("/tipoFrequencia/save")
			   .contentType(MediaType.APPLICATION_FORM_URLENCODED)
			   .sessionAttr("tipoFrequencia", tipoFrequencia)
			   .with(user("ADM"))
			   .with(csrf()))
			   .andExpect(status().isFound())
			   .andExpect(flash().attributeExists(EnumTipoMensagem.SUCESSO.getDescricao()))
			   .andExpect(redirectedUrl("/tipoFrequencia/returnToList"));
	}
	
	@Test
	public void test07ReturnTipoFrequenciaSaved() throws Exception  {
		MvcResult result = mockMvc.perform(post("/tipoFrequencia/list")
							      .contentType(MediaType.APPLICATION_FORM_URLENCODED)
							      .sessionAttr("tipoFrequencia", tipoFrequencia)
							      .with(user("ADM"))
							      .with(csrf()))
							      .andExpect(status().isOk())
							      .andExpect(model().attributeExists("page"))
							      .andExpect(view().name("tipoFrequencia/tipoFrequenciaList"))
							      .andReturn();
		@SuppressWarnings("unchecked")
		Page<TipoFrequencia> page = (Page<TipoFrequencia>) result.getModelAndView().getModelMap().get("page");
		assertThat(page.getContent(), not(empty()));
		assertThat(page.getContent(), hasSize(1));
		tipoFrequencia = page.getContent().get(0);
	}
	
	@Test
	public void test08ReturnToList() throws Exception  {
		MvcResult result = mockMvc.perform(get("/tipoFrequencia/returnToList")
				.contentType(MediaType.APPLICATION_FORM_URLENCODED)
				.with(user("ADM")))
				.andExpect(status().isOk())
				.andExpect(model().attributeExists("page"))
				.andExpect(view().name("tipoFrequencia/tipoFrequenciaList"))
				.andReturn();
		@SuppressWarnings("unchecked")
		Page<TipoFrequencia> page = (Page<TipoFrequencia>) result.getModelAndView().getModelMap().get("page");
		assertThat(page.getContent(), not(empty()));
		assertThat(page.getContent().size(), greaterThanOrEqualTo(1));
	}
	
	@Test
	public void test09remove() throws Exception  {
		mockMvc.perform(get("/tipoFrequencia/delete")
			   .contentType(MediaType.APPLICATION_FORM_URLENCODED)
			   .param("id", tipoFrequencia.getId().toString())
			   .with(user("ADM")))
			   .andExpect(status().isFound())
			   .andExpect(flash().attributeExists(EnumTipoMensagem.SUCESSO.getDescricao()))
			   .andExpect(redirectedUrl("/tipoFrequencia/returnToList"));
	}
	
	private void createTipoFrequenciaTest() {
		tipoFrequencia = new TipoFrequencia();
		tipoFrequencia.setId(1L);
		tipoFrequencia.setDescricaoFrequencia("TESTE AUTOMATIZADO");
		tipoFrequencia.setImpressaoReceita("TESTE IMPRESSAO RECEITA");
		tipoFrequencia.setHorarioInicial(new Date());
		tipoFrequencia.setPeriodicidade(5);
	}

}
