package br.com.mv.modulo.components.element;

import org.thymeleaf.Arguments;
import org.thymeleaf.dom.Element;
import org.thymeleaf.processor.ProcessorResult;
import org.thymeleaf.processor.element.AbstractElementProcessor;

public class MVPeriodoElementProcessor extends AbstractElementProcessor {
	
	public static final int ATTR_PRECEDENCE = 100000;
	public static final String ELEMENT_NAME = "periodo";
	
	
	protected boolean removeHostElement(Arguments arguments, Element element) {
		return true;
	}

	@Override
	public int getPrecedence() {
		return ATTR_PRECEDENCE;
	}
	
	public MVPeriodoElementProcessor() {
        super(ELEMENT_NAME);
    }

	@Override
	protected ProcessorResult processElement(Arguments arguments, Element element) {
		
		Element div = new Element("div");
		div.setAttribute("class", "date-field date form-group");
		div.setAttribute("data-bind", "mvDate:{ value: nascimento}");
		
		Element label = new Element("label");
		label.setAttribute("data-bind", "css: {\'control-label\': true}, text: '" + element.getAttributeValue("data-mv-label") + "'");
		
		div.addChild(label);
		
		Element divInterna = new Element("div");
		divInterna.setAttribute("class", "input-group input-date-field date-field");
		
		Element input = new Element("input");
		input.setAttribute("type", "text");
		input.setAttribute("class", "form-control");
//		input.setAttribute("data-bind", "attr: {id: params.id, disabled : params.disabled}");
		
		divInterna.addChild(input);
		
		Element span = new Element("span");
//		span.setAttribute("data-bind", "attr : {disabled : params.disabled}");
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
