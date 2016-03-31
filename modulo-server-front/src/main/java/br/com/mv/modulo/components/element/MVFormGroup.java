package br.com.mv.modulo.components.element;

import org.thymeleaf.dom.Element;

public class MVFormGroup extends MVContainer{
	
	public MVFormGroup(Element context) {
		super(context);
		this.koCss.addClassCss("form-group");
	}
}
