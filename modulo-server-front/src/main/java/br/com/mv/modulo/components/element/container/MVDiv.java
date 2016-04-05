package br.com.mv.modulo.components.element.container;

import org.thymeleaf.Arguments;
import org.thymeleaf.dom.Element;

public class MVDiv extends MVContainer{

	public MVDiv(Arguments arguments, Element context) {
		super(arguments, context);
		this.el = new Element("div");
	}

}
