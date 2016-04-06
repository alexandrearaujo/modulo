package br.com.mv.modulo.components.element.date;

import org.thymeleaf.Arguments;
import org.thymeleaf.dom.Element;

import br.com.mv.modulo.components.element.container.MVSpan;

public class MVDateInputGroupAddon extends MVSpan{

	public void setDisable(String value){
		koBinding.setDisable(value);
	}
	
	public MVDateInputGroupAddon(Arguments arguments, Element context) {
		super(arguments, context);
		this.domAttribute.addClassCss("input-group-addon");
		this.domAttribute.addClassCss("btn");
	}

}
