package br.com.mv.modulo.components.processors;

import org.thymeleaf.Arguments;
import org.thymeleaf.dom.Element;
import org.thymeleaf.processor.ProcessorResult;
import org.thymeleaf.processor.element.AbstractElementProcessor;

import br.com.mv.modulo.components.element.MVLabel;
import br.com.mv.modulo.components.element.container.MVFormGroup;
import br.com.mv.modulo.components.element.select.MVSelect;

public class MVSelectElementProcessor extends AbstractElementProcessor {

	public static final int ATTR_PRECEDENCE = 100000;
	public static final String ELEMENT_NAME = "select";
	public static final String DIALECT_PREFIX = "mv";
	
	protected boolean removeHostElement(Arguments arguments, Element element) {
		return true;
	}

	@Override
	public int getPrecedence() {
		return ATTR_PRECEDENCE;
	}
	
	public MVSelectElementProcessor() {
        super(ELEMENT_NAME);
    }
	
	@Override
	protected ProcessorResult processElement(Arguments arguments, Element context) {
		MVFormGroup formGroup = new MVFormGroup(arguments, context);
		MVSelect select = new MVSelect(arguments, context);
		boolean hasLabel = context.getAttributeValueFromNormalizedName(DIALECT_PREFIX, "label") != null;

		if(hasLabel){
			MVLabel label = new MVLabel(arguments, context);
			formGroup.addChild(label);
		}
		
		formGroup.addChild(select);
		
		context.addChild(formGroup.render().getEl());

        context.getParent().extractChild(context);
        
        return ProcessorResult.OK;
	}

}
