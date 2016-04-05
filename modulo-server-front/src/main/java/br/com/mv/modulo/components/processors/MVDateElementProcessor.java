package br.com.mv.modulo.components.processors;

import org.thymeleaf.Arguments;
import org.thymeleaf.dom.Element;
import org.thymeleaf.processor.ProcessorResult;
import org.thymeleaf.processor.element.AbstractElementProcessor;

import br.com.mv.modulo.components.element.MVLabel;
import br.com.mv.modulo.components.element.date.MVDate;
import br.com.mv.modulo.components.element.date.MVDateFormGroup;
import br.com.mv.modulo.components.element.date.MVDateIconCalendar;
import br.com.mv.modulo.components.element.date.MVDateInputGroup;
import br.com.mv.modulo.components.element.date.MVDateInputGroupAddon;

public class MVDateElementProcessor extends AbstractElementProcessor {
	
	public static final int ATTR_PRECEDENCE = 100000;
	public static final String ELEMENT_NAME = "date";
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
	protected ProcessorResult processElement(Arguments arguments, Element context) {
		MVDateFormGroup formGroup = new MVDateFormGroup(arguments, context);
		MVDateInputGroup inputGroup = new MVDateInputGroup(arguments, context);
		MVDate date = new MVDate(arguments, context);
		MVDateInputGroupAddon inputGroupAddon = new MVDateInputGroupAddon(arguments, context);
		MVDateIconCalendar iconCalendar = new MVDateIconCalendar(arguments, context);
		inputGroupAddon.addChild(iconCalendar);
		
		boolean hasLabel = context.getAttributeValueFromNormalizedName(DIALECT_PREFIX, "label") != null;

		if(hasLabel){
			MVLabel label = new MVLabel(arguments, context);
			formGroup.addChild(label);
		}
		
		
		inputGroup.addChild(date);
		inputGroup.addChild(inputGroupAddon);
		
		formGroup.addChild(inputGroup);
		
		context.addChild(formGroup.render().getEl());

        context.getParent().extractChild(context);
        
        return ProcessorResult.OK;
	}

}
