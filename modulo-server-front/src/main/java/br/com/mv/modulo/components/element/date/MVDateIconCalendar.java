package br.com.mv.modulo.components.element.date;

import org.thymeleaf.Arguments;
import org.thymeleaf.dom.Element;

import br.com.mv.modulo.components.element.container.MVSpan;

public class MVDateIconCalendar extends MVSpan{

	public MVDateIconCalendar(Arguments arguments, Element context) {
		super(arguments, context);
		this.domAttribute.addClassCss("glyphicon");
		this.domAttribute.addClassCss("glyphicon-calendar");
	}

}
