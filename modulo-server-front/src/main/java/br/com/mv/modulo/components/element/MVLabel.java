package br.com.mv.modulo.components.element;

import org.thymeleaf.Arguments;
import org.thymeleaf.dom.Element;

public class MVLabel extends MVElement {
	
	public void setRequired(String required){
		koCss.setRequired(required);
	}
	
	public void setId(String id){
		StringBuilder idLabel = new StringBuilder();
		idLabel.append("'").append(id).append("Label'");
		koAttr.setId(idLabel.toString());

		StringBuilder idField = new StringBuilder();
		idField.append("'").append(id).append("'");
		koAttr.setFor(idField.toString());
	}
	
	public void setLabel(String label){
		koBinding.setText(getI8n(label));
	}
	
	public MVLabel(Arguments arguments, Element context) {
		super(arguments, context);
		this.setEl(new Element("label"));
		koCss.addClassCss("control-label");
	}
	
}
