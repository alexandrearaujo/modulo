package br.com.mv.modulo.components.element;

import org.thymeleaf.Arguments;
import org.thymeleaf.dom.Element;
import org.thymeleaf.processor.ProcessorResult;
import org.thymeleaf.processor.element.AbstractElementProcessor;
import org.thymeleaf.util.Validate;

public class MVDateElementProcessor extends AbstractElementProcessor {
	
	public static final int ATTR_PRECEDENCE = 100000;
	public static final String ELEMENT_NAME = "data";
	public static final String DIALECT_PREFIX = "mv";
	
	
	protected boolean removeHostElement(Arguments arguments, Element element) {
		return true;
	}

	@Override
	public int getPrecedence() {
		return ATTR_PRECEDENCE;
	}
	
	public MVDateElementProcessor() {
        super(ELEMENT_NAME);
    }
	

	@Override
	protected ProcessorResult processElement(Arguments arguments, Element element) {
		String mvAttrValue = element.getAttributeValueFromNormalizedName(DIALECT_PREFIX, "value");
		String mvAttrDisabled = element.getAttributeValueFromNormalizedName(DIALECT_PREFIX, "disabled");
		
		Element div = new Element("div");
		div.setAttribute("class", "date-field date form-group");
		Validate.notNull(mvAttrValue, "Campo value obrigatório");
		div.setAttribute("data-bind", "mvDate:{ value: " + mvAttrValue + "}");
		
		MVLabelElementGenerator mvLabelElementGenerator = new MVLabelElementGenerator(arguments, element);
		div.addChild(mvLabelElementGenerator.getLabel());
		
		Element divInterna = new Element("div");
		divInterna.setAttribute("class", "input-group input-date-field date-field");
		
		MVInputElementGenerator mvInputElementGenerator = new MVInputElementGenerator(arguments, element);
		divInterna.addChild(mvInputElementGenerator.getInput());
		
		Element span = new Element("span");
		
		if (Boolean.parseBoolean(mvAttrDisabled)) {
			span.setAttribute("disabled", "disabled");
		}
		
		span.setAttribute("class", "input-group-addon btn");
		
		Element spanInterno = new Element("span");
		spanInterno.setAttribute("class", "glyphicon glyphicon-calendar");
		
		span.addChild(spanInterno);
		
		divInterna.addChild(span);
		
		div.addChild(divInterna);
		
		element.addChild(div);

        element.getParent().extractChild(element);
        
        return ProcessorResult.OK;
	}

}
