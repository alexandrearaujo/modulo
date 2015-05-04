package br.com.mv.modulo.web;

import java.lang.reflect.ParameterizedType;

import javax.validation.Valid;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.web.bind.annotation.AuthenticationPrincipal;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import br.com.mv.geral.model.User;
import br.com.mv.modulo.business.GenericCrudBusiness;
import br.com.mv.modulo.exception.GenericMessages;
import br.com.mv.modulo.model.type.EnumTipoMensagem;


public abstract class GenericCrudController<T> {
	
	protected Page<T> page;
	protected final GenericMessages genericMessages;
	private final GenericCrudBusiness<T> genericCrudBusiness;
	private Class<T> clazz = (Class<T>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
	
	@Autowired
	public GenericCrudController(GenericMessages genericMessages, GenericCrudBusiness<T> genericCrudBusiness) {
		this.genericMessages = genericMessages;
		this.genericCrudBusiness = genericCrudBusiness;
	}
	
	@RequestMapping(value={"/", "/list"}, method = RequestMethod.GET)
	public String tolist(@AuthenticationPrincipal User usuario, Model model) {
		instantiateModel(model, usuario, true);
		page = null;
		model.addAttribute("page", page);
		return getListPageName();
	}
	
	@RequestMapping(value="/list", method = RequestMethod.POST)
	public String findModel(@ModelAttribute T t, Model model, @AuthenticationPrincipal User usuario) {
		Pageable pageable = new PageRequest(0, 7, Sort.DEFAULT_DIRECTION, "cidadaoPaciente.nome");
		this.page = genericCrudBusiness.listModel(t, pageable);
		
		model.addAttribute("page", this.page);
		model.addAttribute(getModelName(), t);
		
		return getListPageName();
	}
	
	@RequestMapping(value="/listPaginated", method = RequestMethod.GET)
	public String findModelPaginated(@ModelAttribute T t, 
											  @RequestParam(value = "page", defaultValue = "") Integer page,
											  @RequestParam(value = "size", defaultValue = "") Integer size, 
											  @RequestParam(value = "idToRender", defaultValue = "") String idToRender,
											  Model model) {
		Pageable pageable = new PageRequest(page, size, Sort.DEFAULT_DIRECTION, "cidadaoPaciente.nome");
		this.page = genericCrudBusiness.listModel(t, pageable);
		
		model.addAttribute("page", this.page);
		model.addAttribute(getModelName(), t);
		
		return getListPageName() + " :: #" + idToRender;
	}
	
	@RequestMapping(value="/new", method = RequestMethod.GET)
	public String toNewForm(@AuthenticationPrincipal User usuario, Model model) {
		instantiateModel(model, usuario, false);
		return getFormPageName();
	}
	
	@RequestMapping(value="/delete", method = RequestMethod.GET)
	public String remove(@RequestParam(value = "id", required = true) Long id, RedirectAttributes redirectAttrs) {
		try {
			genericCrudBusiness.delete(id);
			redirectAttrs.addFlashAttribute("success", genericMessages.getDeleteSuccess());
		} catch (IllegalArgumentException e) {
			redirectAttrs.addFlashAttribute(EnumTipoMensagem.ERRO.getDescricao(), genericMessages.getNotFound());
		}
		
		return getReturnToListURL();
	}
	
	@RequestMapping(value="/edit", method = RequestMethod.GET)
	public String toEditForm(@RequestParam(value = "id", required = true) T t, Model model, @AuthenticationPrincipal User usuario) {
		model.addAttribute(getModelName(), t);
		return getFormPageName();
	}
	
	@RequestMapping(value="/save", method = RequestMethod.POST)
	public String save(@ModelAttribute @Valid T t, final BindingResult bindingResult,
					   RedirectAttributes redirectAttrs, Model model, SessionStatus status) {
        if (bindingResult.hasErrors()) {
            model.addAttribute("org.springframework.validation.BindingResult.strategy", bindingResult);
            model.addAttribute("devolucaoMedicamento", t);
    		return getFormPageName();
        } else {
        	try {
        		genericCrudBusiness.save(t);
        		status.setComplete();
        		redirectAttrs.addFlashAttribute(EnumTipoMensagem.SUCESSO.getDescricao(), genericMessages.getSaveSuccess());
        	} catch (DataIntegrityViolationException e) {
        		redirectAttrs.addFlashAttribute(EnumTipoMensagem.ERRO.getDescricao(), e.getMessage());
    		} catch (Exception e) {
        		redirectAttrs.addFlashAttribute(EnumTipoMensagem.ERRO.getDescricao(), e.getMessage());
        	}
        	
        }
        
        return getReturnToListURL();
	}
	
	private String getReturnToListURL() {
		return "redirect:/" + getModelName() + "/returnToList";
	}
	
	private String getModelName() {
		return StringUtils.uncapitalize(clazz.getSimpleName());
	}
	
	@RequestMapping(value={"/returnToList"}, method = RequestMethod.GET)
	public String returnToListAndFindAll(@AuthenticationPrincipal User usuario, Model model) {
		T object = null;
		try {
			object = clazz.newInstance();
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		}
		Pageable pageable = new PageRequest(0, 7, Sort.DEFAULT_DIRECTION, "descricao");
		
		this.page = genericCrudBusiness.listModel(object, pageable);
		
		instantiateModel(model, usuario, true);
		model.addAttribute("page", this.page);
		return getListPageName();
	}
	
	protected void instantiateModel(Model model, @AuthenticationPrincipal User usuario, boolean isList) {
		T object = null;
		try {
			object = clazz.newInstance();
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		}
		model.addAttribute(getModelName(), object);
	}
	
	public abstract String getListPageName();
	public abstract String getFormPageName();
	
}