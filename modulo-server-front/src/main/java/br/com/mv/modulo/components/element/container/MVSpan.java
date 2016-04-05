package br.com.mv.modulo.components.element.container;

import org.thymeleaf.Arguments;
import org.thymeleaf.dom.Element;

public class MVSpan extends MVContainer{

	public MVSpan(Arguments arguments, Element context) {
		super(arguments, context);
		this.el = new Element("span");
	}
}
