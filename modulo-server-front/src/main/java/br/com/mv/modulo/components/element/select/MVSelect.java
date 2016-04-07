package br.com.mv.modulo.components.element.select;

import org.thymeleaf.Arguments;
import org.thymeleaf.dom.Element;

import br.com.mv.modulo.components.element.MVElement;

public class MVSelect extends MVElement{

	public void setFocus(String value) {
		koEvent.setFocus(value);
	}
	
	public void setFocusIn(String value) {
		koEvent.setFocusIn(value);
	}

	public void setFocusOut(String value) {
		koEvent.setFocusOut(value);
	}

	public void setBlur(String value) {
		koEvent.setBlur(value);
	}

	public void setChange(String value) {
		koEvent.setChange(value);
	}
	
	public void setId(String value){
		domAttribute.setId(value);
	}
	
	public void setDisable(String value) {
		koBinding.setDisable(value);
	}
	
	public void setVisible(String value) {
		koBinding.setVisible(value);
	}
	
	public void setValue(String value) {
		koBinding.setValue(value);
	}
	
	public void setOptions(String options) {
		koBinding.setOptions(options);
	}
	
	public void setOptionsText(String optionsText) {
		koBinding.setOptionsText(optionsText);
	}
	
	public void setOptionsValue(String optionsValue) {
		koBinding.setOptionsValue(optionsValue);
	}
	
	public void setOptionsCaption(String optionsCaption) {
		koBinding.setOptionsCaption(optionsCaption);
	}
	
	public MVSelect(Arguments arguments, Element context) {
		super(arguments, context);
		this.el = new Element("select");
		this.domAttribute.addClassCss("form-control");
	}
}
