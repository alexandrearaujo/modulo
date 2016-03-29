package br.com.mv.modulo.components.element;

import org.apache.commons.lang3.StringUtils;
import org.thymeleaf.Arguments;
import org.thymeleaf.dom.Element;
import org.thymeleaf.dom.Text;

public class MVLabelElementGenerator extends MVElementGenerator {
	
	private final String mvLabel;
	private final String mvAttrLabel;
	
	private Element label = new Element("label");
	
	
	public MVLabelElementGenerator(final Arguments arguments, final Element element) {
		super(arguments, element);
		
		this.mvAttrLabel = element.getAttributeValueFromNormalizedName(DIALECT_PREFIX, "label");
		
		if (mvAttrLabel == null) {
			this.label = null;
			this.mvLabel = null;
		} else  {
			this.mvLabel = getText(arguments, "#{" + mvAttrLabel + "}");
			
			label.setAttribute("class", "control-label");
			
			if (Boolean.parseBoolean(mvAttrRequired)) {
				label.setAttribute("class", label.getAttributeValue("class") + " " + "required");
			}
			
			if (StringUtils.isNotBlank(mvLabel)) {
				label.addChild(new Text(mvLabel));
			}
			
			if (StringUtils.isNotBlank(mvAttrId)) {
				label.setAttribute("id", mvAttrId + "Label");
				label.setAttribute("for", mvAttrId);
			}
		}
	}
	
	
	public Element getLabel() {
		return this.label;
	}

}