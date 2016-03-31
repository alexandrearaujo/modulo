package br.com.mv.modulo.components.processors;

import org.thymeleaf.Arguments;
import org.thymeleaf.dom.Element;
import org.thymeleaf.processor.ProcessorResult;
import org.thymeleaf.processor.element.AbstractElementProcessor;

import br.com.mv.modulo.components.element.MVFormGroup;
import br.com.mv.modulo.components.element.MVInput;
import br.com.mv.modulo.components.element.MVLabel;

public class MVTextElementProcessor extends AbstractElementProcessor {

	public static final int ATTR_PRECEDENCE = 100000;
	public static final String ELEMENT_NAME = "text";
	public static final String DIALECT_PREFIX = "mv";
	
	protected boolean removeHostElement(Arguments arguments, Element element) {
		return true;
	}
	
	@Override
	protected ProcessorResult processElement(Arguments arguments, Element context) {
		MVFormGroup formGroup = new MVFormGroup(context);
		MVLabel label = new MVLabel(context);
		MVInput input = new MVInput(context);
		
		formGroup.addChild(label);
		formGroup.addChild(input);
		
		context.addChild(formGroup.render().getEl());

        context.getParent().extractChild(context);
        
        return ProcessorResult.OK;
	}
	
	@Override
	public int getPrecedence() {
		return ATTR_PRECEDENCE;
	}
	
	public MVTextElementProcessor() {
        super(ELEMENT_NAME);
    }

}
