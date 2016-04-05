package br.com.mv.modulo.components.element.container;

import org.thymeleaf.Arguments;
import org.thymeleaf.dom.Element;

public class MVInputGroup extends MVDiv{

	public MVInputGroup(Arguments arguments, Element context) {
		super(arguments, context);
		this.koCss.addClassCss("input-group");
	}

}
