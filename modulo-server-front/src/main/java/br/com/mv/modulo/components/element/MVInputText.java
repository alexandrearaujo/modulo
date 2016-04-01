package br.com.mv.modulo.components.element;

import org.thymeleaf.Arguments;
import org.thymeleaf.dom.Element;

public class MVInputText extends MVInput {
	
	public MVInputText(Arguments arguments, Element context) {
		super(arguments, context);
		this.el.setAttribute("type", "text");
	}
}
