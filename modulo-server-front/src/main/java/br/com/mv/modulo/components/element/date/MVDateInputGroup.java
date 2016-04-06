package br.com.mv.modulo.components.element.date;

import org.thymeleaf.Arguments;
import org.thymeleaf.dom.Element;

import br.com.mv.modulo.components.element.container.MVInputGroup;

public class MVDateInputGroup extends MVInputGroup{

	public MVDateInputGroup(Arguments arguments, Element context) {
		super(arguments, context);
		this.domAttribute.addClassCss("input-date-field");
		this.domAttribute.addClassCss("date-field");
	}
}
