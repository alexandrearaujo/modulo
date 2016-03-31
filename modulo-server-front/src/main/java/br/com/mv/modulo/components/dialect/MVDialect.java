package br.com.mv.modulo.components.dialect;

import java.util.LinkedHashSet;
import java.util.Map;
import java.util.Set;

import org.thymeleaf.context.IProcessingContext;
import org.thymeleaf.dialect.AbstractXHTMLEnabledDialect;
import org.thymeleaf.dialect.IExpressionEnhancingDialect;
import org.thymeleaf.processor.IProcessor;

import br.com.mv.modulo.components.processors.MVDateElementProcessor;
import br.com.mv.modulo.components.processors.MVPeriodoElementProcessor;
import br.com.mv.modulo.components.processors.MVTextElementProcessor;

public class MVDialect extends AbstractXHTMLEnabledDialect implements IExpressionEnhancingDialect {
	
	public static final String DEFAULT_PREFIX = "mv";

	@Override
	public String getPrefix() {
		return DEFAULT_PREFIX;
	}
	
	public boolean isLenient() {
        return false;
    }
	
	@Override
	public Set<IProcessor> getProcessors() {
		final Set<IProcessor> processors = new LinkedHashSet<IProcessor>();
		processors.add(new MVDateElementProcessor());
		processors.add(new MVPeriodoElementProcessor());
		processors.add(new MVTextElementProcessor());
		return processors;
	}

	@Override
	public Map<String, Object> getAdditionalExpressionObjects(IProcessingContext processingContext) {
		// TODO Auto-generated method stub
		return null;
	}


}
