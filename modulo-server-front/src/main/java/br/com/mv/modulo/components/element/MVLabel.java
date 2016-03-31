package br.com.mv.modulo.components.element;

import org.thymeleaf.dom.Element;

public class MVLabel extends MVElement {
	
	public MVLabel(Element context) {
		super(context);
		this.setEl(new Element("label"));
		koCss.setRequired(context.getAttributeValueFromNormalizedName("mv", "required"));
//		koAttr.setId(context.getAttributeValueFromNormalizedName("mv", "id").concat("Label"));
		koAttr.setFor(context.getAttributeValueFromNormalizedName("mv", "id"));
		koBinding.setText(context.getAttributeValueFromNormalizedName("mv", "label"));
		koCss.addClassCss("control-label");
	}
}
