package br.com.mv.modulo.components.element;

import org.thymeleaf.dom.Element;

public class MVInputText extends MVInput {
	
	public MVInputText(Element context) {
		super(context);
		this.el.setAttribute("type", "text");
	}
}
