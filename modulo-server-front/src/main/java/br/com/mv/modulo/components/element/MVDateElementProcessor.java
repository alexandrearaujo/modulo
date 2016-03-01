package br.com.mv.modulo.components.element;

import org.thymeleaf.Arguments;
import org.thymeleaf.Configuration;
import org.thymeleaf.dom.Attribute;
import org.thymeleaf.dom.Element;
import org.thymeleaf.processor.ProcessorResult;
import org.thymeleaf.processor.element.AbstractElementProcessor;
import org.thymeleaf.standard.expression.IStandardExpression;
import org.thymeleaf.standard.expression.IStandardExpressionParser;
import org.thymeleaf.standard.expression.StandardExpressions;

public class MVDateElementProcessor extends AbstractElementProcessor {
	
	public static final int ATTR_PRECEDENCE = 100000;
	public static final String ELEMENT_NAME = "date";
	
	
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
	
    protected final String getText(final Arguments arguments, final String attributeValue) {
        final Configuration configuration = arguments.getConfiguration();
        final IStandardExpressionParser expressionParser = StandardExpressions.getExpressionParser(configuration);
        final IStandardExpression expression = expressionParser.parseExpression(configuration, arguments, attributeValue);
        final Object result = expression.execute(configuration, arguments);
        return (result == null ? "" : result.toString());
    }

	@Override
	protected ProcessorResult processElement(Arguments arguments, Element element) {
		Attribute mvAttrId = (element.hasAttribute("data-mv-id") ? element.getAttributeFromNormalizedName("data-mv-id") : element.getAttributeFromNormalizedName("mv:id"));
		Attribute mvAttrValue = (element.hasAttribute("data-mv-value") ? element.getAttributeFromNormalizedName("data-mv-value") : element.getAttributeFromNormalizedName("mv:value"));
		Attribute mvAttrRequired = (element.hasAttribute("data-mv-required") ? element.getAttributeFromNormalizedName("data-mv-required") : element.getAttributeFromNormalizedName("mv:required"));
		Attribute mvAttrDisabled = (element.hasAttribute("data-mv-disabled") ? element.getAttributeFromNormalizedName("data-mv-disabled") : element.getAttributeFromNormalizedName("mv:disabled"));
		Attribute mvAttrLabel = (element.hasAttribute("data-mv-label") ? element.getAttributeFromNormalizedName("data-mv-label") : element.getAttributeFromNormalizedName("mv:label"));
		
		String mvLabel = getText(arguments, mvAttrLabel.getValue());
		
		Element div = new Element("div");
		div.setAttribute("class", "date-field date form-group");
		div.setAttribute("data-bind", "mvDate:{ value: " + mvAttrValue.getValue() + "}");
		
		Element label = new Element("label");
		label.setAttribute("data-bind", "css: {required: " + mvAttrRequired.getValue() + ", \'control-label\': true}, id : " + mvAttrId.getValue() + "Label, attr: { for : '" + mvAttrId.getValue() + "' }, text: '" + mvLabel + "'");
		
		div.addChild(label);
		
		Element divInterna = new Element("div");
		divInterna.setAttribute("class", "input-group input-date-field date-field");
		
		Element input = new Element("input");
		input.setAttribute("type", "text");
		input.setAttribute("class", "form-control");
		input.setAttribute("data-bind", "attr: {id: '" + mvAttrId.getValue() + "', disabled : " + mvAttrDisabled.getValue() + "}");
		
		divInterna.addChild(input);
		
		Element span = new Element("span");
		span.setAttribute("data-bind", "attr : {disabled : " + mvAttrDisabled.getValue() + "}");
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
