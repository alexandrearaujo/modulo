package br.com.mv.modulo.components.element;

import org.thymeleaf.Arguments;
import org.thymeleaf.dom.Element;

public class MVInput extends MVElement {

	public void setId(String value){
		domAttribute.setId(value);
	}
	
	public void setDisable(String value) {
		koBinding.setDisable(value);
	}

	public void setValueUpdate(String value) {
		koBinding.put("valueUpdate", value);
	}

	public void setMaxlength(String value) {
		domAttribute.setMaxlength(value);
	}

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

	public void setKeyPress(String value) {
		koEvent.setKeyPress(value);
	}

	public void setKeyDown(String value) {
		koEvent.setKeyDown(value);
	}

	public void setKeyUp(String value) {
		koEvent.setKeyUp(value);
	}

	public void setSelect(String value) {
		koEvent.setSelect(value);
	}
	
	public void setTooltipError(String value) {
		tooltipError.setValue(koBinding.get("value"));
	}
	
	public MVInput(Arguments arguments, Element context) {
		super(arguments, context);

		this.el = new Element("input");

		koCss.addClassCss("form-control");
		
		// TODO:numeric only colocar em outro componente?
		// koCss.put("'numbersOnly'",
		// context.getAttributeValueFromNormalizedName("mv", "numeric"));
	}
}
