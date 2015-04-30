package br.com.mv.modulo.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import br.com.mv.modulo.model.TipoFrequencia;

@Controller
@RequestMapping("/teste")
public class TesteController extends GenericCrudController<TipoFrequencia> {

	@Override
	public String getListPageName() {
		return "tipoFrequencia/tipoFrequenciaList";
	}

}
