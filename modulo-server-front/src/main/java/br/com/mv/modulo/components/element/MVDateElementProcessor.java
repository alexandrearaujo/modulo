package br.com.mv.modulo.components.element;

import org.thymeleaf.Arguments;
import org.thymeleaf.Configuration;
import org.thymeleaf.dom.Element;
import org.thymeleaf.dom.Text;
import org.thymeleaf.processor.ProcessorResult;
import org.thymeleaf.processor.element.AbstractElementProcessor;
import org.thymeleaf.standard.expression.IStandardExpression;
import org.thymeleaf.standard.expression.IStandardExpressionParser;
import org.thymeleaf.standard.expression.StandardExpressions;
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
	
    protected final String getText(final Arguments arguments, final String attributeValue) {
        final Configuration configuration = arguments.getConfiguration();
        final IStandardExpressionParser expressionParser = StandardExpressions.getExpressionParser(configuration);
        final IStandardExpression expression = expressionParser.parseExpression(configuration, arguments, attributeValue);
        final Object result = expression.execute(configuration, arguments);
        return (result == null ? "" : result.toString());
    }

	@Override
	protected ProcessorResult processElement(Arguments arguments, Element element) {
		String mvAttrId = element.getAttributeValueFromNormalizedName(DIALECT_PREFIX, "id");
		String mvAttrValue = element.getAttributeValueFromNormalizedName(DIALECT_PREFIX, "value");
		String mvAttrRequired = element.getAttributeValueFromNormalizedName(DIALECT_PREFIX, "required");
		String mvAttrDisabled = element.getAttributeValueFromNormalizedName(DIALECT_PREFIX, "disabled");
		String mvAttrLabel = element.getAttributeValueFromNormalizedName(DIALECT_PREFIX, "label");
		
		String mvLabel = mvAttrLabel != null ? getText(arguments, "#{" + mvAttrLabel + "}") : "";
		
		Element div = new Element("div");
		div.setAttribute("class", "date-field date form-group");
		Validate.notNull(mvAttrValue, "Campo value obrigatório");
		div.setAttribute("data-bind", "mvDate:{ value: " + mvAttrValue + "}");
		
		Element label = new Element("label");
		label.setAttribute("class", "control-label");
		if (Boolean.parseBoolean(mvAttrRequired)) {
			label.setAttribute("class", label.getAttributeValue("class") + " " + "required");
		}
		
		if (mvLabel != null) {
			label.addChild(new Text(mvLabel));
		}
		
		div.addChild(label);
		
		Element divInterna = new Element("div");
		divInterna.setAttribute("class", "input-group input-date-field date-field");
		
		Element input = new Element("input");
		input.setAttribute("type", "text");
		input.setAttribute("class", "form-control");
		
		if (mvAttrId != null) {
			input.setAttribute("id" , mvAttrId);
			label.setAttribute("id", mvAttrId + "Label");
			label.setAttribute("for", mvAttrId);
		}
		
		divInterna.addChild(input);
		
		Element span = new Element("span");
		
		if (Boolean.parseBoolean(mvAttrDisabled)) {
			span.setAttribute("disabled", "disabled");
			input.setAttribute("disabled", "disabled");
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
