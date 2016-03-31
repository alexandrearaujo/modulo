package br.com.mv.modulo.components.element;

import org.thymeleaf.Arguments;
import org.thymeleaf.dom.Element;

public class MVInputElementGenerator extends MVElementGenerator {
	
	private Element input = new Element("input");
	
	
	public MVInputElementGenerator(final Arguments arguments, final Element element) {
		super(arguments, element);
		
		input.setAttribute("type", "text");
		input.setAttribute("class", "form-control");
		input.setAttribute("data-bind", "tooltipError : { value: " + mvAttrValue + " }");
		
		if (mvAttrId != null) {
			input.setAttribute("id" , mvAttrId);
		}
		
		if (Boolean.parseBoolean(mvAttrDisabled)) {
			input.setAttribute("disabled", "disabled");
		}
	}
	
	public Element getInput() {
		return this.input;
	}

}
