package br.com.mv.modulo.components.element;

import org.thymeleaf.Arguments;
import org.thymeleaf.dom.Element;

public class MVLabel extends MVElement {
	
	public void setRequired(String required){
		koCss.setRequired(required);
	}
	
	public void setId(String id){
		StringBuilder idLabel = new StringBuilder();
		idLabel.append(id).append("Label");
		domAttribute.setId(idLabel.toString());
		domAttribute.setFor(id);
	}
	
	public void setLabel(String label){
		koBinding.setText(getI8n(label));
	}
	
	public MVLabel(Arguments arguments, Element context) {
		super(arguments, context);
		this.setEl(new Element("label"));
		domAttribute.addClassCss("control-label");
	}
	
}
