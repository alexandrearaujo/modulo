package br.com.mv.modulo.web;

import java.util.ArrayList;

import javax.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import br.com.mv.modulo.business.TipoFrequenciaBusiness;
import br.com.mv.modulo.exception.GenericMessages;
import br.com.mv.modulo.model.DetalheTipoFrequencia;
import br.com.mv.modulo.model.TipoFrequencia;
import br.com.mv.modulo.model.type.EnumTipoMensagem;

@Controller
@SessionAttributes(types = TipoFrequencia.class)
@RequestMapping("/tipoFrequencia")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class TipoFrequenciaController {
	
	private final TipoFrequenciaBusiness tipoFrequenciaBusiness;
	
	private final GenericMessages genericMessages;
	
	private Page<TipoFrequencia> page;

	
	@RequestMapping(value={"/", "/list"}, method = RequestMethod.GET)
	public String tolist(Model model) {
		model.addAttribute("tipoFrequencia", new TipoFrequencia());
		page = null;
		model.addAttribute("page", page);
		return "tipoFrequencia/tipoFrequenciaList";
	}
	
	@RequestMapping(value="/list", method = RequestMethod.POST)
	public String findTipoFrequencia(@ModelAttribute TipoFrequencia tipoFrequencia, Model model) {
		Pageable pageable = new PageRequest(0, 7, Sort.DEFAULT_DIRECTION, "descricaoFrequencia");
		this.page = tipoFrequenciaBusiness.listTipoFrequencia(tipoFrequencia, pageable);
		
		model.addAttribute("page", this.page);
		model.addAttribute("tipoFrequencia", tipoFrequencia);
		
		return "tipoFrequencia/tipoFrequenciaList";
	}
	
	@RequestMapping(value="/listPaginated", method = RequestMethod.GET)
	public String findTipoFrequenciaPaginated(@ModelAttribute TipoFrequencia tipoFrequencia, 
											  @RequestParam(value = "page", defaultValue = "") Integer page,
											  @RequestParam(value = "size", defaultValue = "") Integer size, 
											  @RequestParam(value = "idToRender", defaultValue = "") String idToRender,
											  Model model) {
		Pageable pageable = new PageRequest(page, size, Sort.DEFAULT_DIRECTION, "descricaoFrequencia");
		this.page = tipoFrequenciaBusiness.listTipoFrequencia(tipoFrequencia, pageable);
		
		model.addAttribute("page", this.page);
		model.addAttribute("tipoFrequencia", tipoFrequencia);
		
		return "tipoFrequencia/tipoFrequenciaList :: #" + idToRender;
	}
	
	@RequestMapping(value="/new", method = RequestMethod.GET)
	public String toNewForm(Model model) {
		TipoFrequencia tipoFrequencia = new TipoFrequencia();
		tipoFrequencia.setDetalhes(new ArrayList<DetalheTipoFrequencia>());
		model.addAttribute("tipoFrequencia", tipoFrequencia);
		return "tipoFrequencia/tipoFrequenciaForm";
	}
	
	@RequestMapping(value="/edit", method = RequestMethod.GET)
	public String toEditForm(@RequestParam(value = "id", required = true) TipoFrequencia tipoFrequencia, Model model) {
		model.addAttribute("tipoFrequencia", tipoFrequencia);
		model.addAttribute("existsItemSolicitacao", tipoFrequenciaBusiness.existsItemSolicitacaoMedicamentoForTipoFrequencia(tipoFrequencia.getId()));
		return "tipoFrequencia/tipoFrequenciaForm";
	}
	
	@RequestMapping(value="/delete", method = RequestMethod.GET)
	public String remove(@RequestParam(value = "id", required = true) Long id, RedirectAttributes redirectAttrs) {
		try {
			if (tipoFrequenciaBusiness.delete(id)) {
				redirectAttrs.addFlashAttribute("success", genericMessages.getDeleteSuccess());
			} else
			{
				redirectAttrs.addFlashAttribute(EnumTipoMensagem.ERRO.getDescricao(), genericMessages.getMessage("erro.tipoFrequencia.NaoPodeSerExcluido"));
			}
		} catch (IllegalArgumentException e) {
			redirectAttrs.addFlashAttribute(EnumTipoMensagem.ERRO.getDescricao(), genericMessages.getNotFound());
		}
		
		return "redirect:/tipoFrequencia/returnToList";
	}
	
	@RequestMapping(value="/save", params={"adicionarHorarioMedicacao"}, method = RequestMethod.POST)
	public String addHorarioMedicacao(@ModelAttribute TipoFrequencia tipoFrequencia, Model model, final BindingResult bindingResult) {
		tipoFrequencia.setDetalhes(new ArrayList<DetalheTipoFrequencia>());
		tipoFrequencia = tipoFrequenciaBusiness.adicionarHorariosMedicacao(tipoFrequencia);
		model.addAttribute("tipoFrequencia", tipoFrequencia);
		return "tipoFrequencia/tipoFrequenciaForm";
	}
	
	@RequestMapping(value="/save", method = RequestMethod.POST)
	public String save(@ModelAttribute @Valid TipoFrequencia tipoFrequencia, final BindingResult bindingResult,
					   RedirectAttributes redirectAttrs, Model model, SessionStatus status) {
        if (bindingResult.hasErrors()) {
            model.addAttribute("org.springframework.validation.BindingResult.strategy", bindingResult);
            model.addAttribute("tipoFrequencia", tipoFrequencia);
            if (bindingResult.getFieldError().getField().equals("detalhes")) {
            	model.addAttribute(EnumTipoMensagem.ERRO.getDescricao(), genericMessages.getMessage("erro.tipoFrequencia.horariosNaoGerados"));
            }
    		return "tipoFrequencia/tipoFrequenciaForm";
        } else {
        	try {
        		tipoFrequenciaBusiness.save(tipoFrequencia);
        		status.setComplete();
        		redirectAttrs.addFlashAttribute(EnumTipoMensagem.SUCESSO.getDescricao(), genericMessages.getSaveSuccess());
        	} catch (DataIntegrityViolationException e) {
        		model.addAttribute("tipoFrequencia", tipoFrequencia);
        		model.addAttribute(EnumTipoMensagem.ERRO.getDescricao(), genericMessages.getMessage("erro.tipoFrequencia.jaExiste"));
        		return "tipoFrequencia/tipoFrequenciaForm";
    		} catch (Exception e) {
        		redirectAttrs.addFlashAttribute(EnumTipoMensagem.ERRO.getDescricao(), e.getMessage());
        	}
        	
        }
        
        return "redirect:/tipoFrequencia/returnToList";
	}
	
	@RequestMapping(value={"/returnToList"}, method = RequestMethod.GET)
	public String returnToListAndFindAll(Model model) {
		Pageable pageable = new PageRequest(0, 7, Sort.DEFAULT_DIRECTION, "descricaoFrequencia");
		this.page = tipoFrequenciaBusiness.listTipoFrequencia(new TipoFrequencia(), pageable);
		model.addAttribute("tipoFrequencia", new TipoFrequencia());
		model.addAttribute("page", this.page);
		return "tipoFrequencia/tipoFrequenciaList";
	}
	
	@RequestMapping(value="/clearDetalhes", method = RequestMethod.GET)
	public String clearDetalhes(@ModelAttribute TipoFrequencia tipoFrequencia, Model model) {
		tipoFrequencia.setDetalhes(new ArrayList<DetalheTipoFrequencia>());
		model.addAttribute("tipoFrequencia", tipoFrequencia);
		return "tipoFrequencia/tipoFrequenciaForm :: table";
	}
}