package br.com.mv.modulo.web;

import java.lang.reflect.ParameterizedType;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

public abstract class GenericCrudController<T> {
	
	protected Page<T> page;
	
	private T t;
	
	@RequestMapping(value={"/", "/list"}, method = RequestMethod.GET)
	public String tolist(Model model) {
		
		try {
			Class<T> clazz = (Class<T>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
			model.addAttribute(StringUtils.uncapitalize(clazz.getSimpleName()), clazz.newInstance());
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		page = null;
		model.addAttribute("page", page);
		return getListPageName();
	}
	
	public abstract String getListPageName();
	

	public T getT() {
		return t;
	}

	public void setT(T t) {
		this.t = t;
	}

}
