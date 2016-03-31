package br.com.mv.modulo.components.element;

import org.thymeleaf.dom.Element;

public class MVInput extends MVElement{

	public MVInput(Element context){
		super(context);
		
		this.el = new Element("input");
		
		
		//FIXME:generalizar isto.
		koCss.addClassCss("form-control");
		koBinding.setValue(context.getAttributeValueFromNormalizedName("mv", "value"));
		koBinding.setDisable(context.getAttributeValueFromNormalizedName("mv", "disable"));
		koBinding.put("inputMask", context.getAttributeValueFromNormalizedName("mv", "inputMask"));
		
		//TODO:Vai precisar?
		koBinding.put("valueUpdate", context.getAttributeValueFromNormalizedName("mv", "valueUpdate"));
		koBinding.put("tooltipError", context.getAttributeValueFromNormalizedName("mv", "tooltipError"));
		koAttr.put("maxLength", context.getAttributeValueFromNormalizedName("mv", "maxLength"));
		
		//TODO:numeric only colocar em outro componente?
//		koCss.put("'numbersOnly'", context.getAttributeValueFromNormalizedName("mv", "numeric"));
	}
	
}
