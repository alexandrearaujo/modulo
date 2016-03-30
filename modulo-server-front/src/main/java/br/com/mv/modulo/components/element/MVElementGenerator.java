package br.com.mv.modulo.components.element;

import org.thymeleaf.Arguments;
import org.thymeleaf.Configuration;
import org.thymeleaf.dom.Element;
import org.thymeleaf.standard.expression.IStandardExpression;
import org.thymeleaf.standard.expression.IStandardExpressionParser;
import org.thymeleaf.standard.expression.StandardExpressions;

public class MVElementGenerator {
	
	protected final String mvAttrId;
	protected final String mvAttrValue;
	protected final String mvAttrRequired;
	protected final String mvAttrDisabled;
	
	public static final String DIALECT_PREFIX = "mv";
	
	
	public MVElementGenerator(final Arguments arguments, final Element element) {
		this.mvAttrId = element.getAttributeValueFromNormalizedName(DIALECT_PREFIX, "id");
		this.mvAttrValue = element.getAttributeValueFromNormalizedName(DIALECT_PREFIX, "value");
		this.mvAttrRequired = element.getAttributeValueFromNormalizedName(DIALECT_PREFIX, "required");
		this.mvAttrDisabled = element.getAttributeValueFromNormalizedName(DIALECT_PREFIX, "disabled");
	}

	
	protected final String getText(final Arguments arguments, final String attributeValue) {
        final Configuration configuration = arguments.getConfiguration();
        final IStandardExpressionParser expressionParser = StandardExpressions.getExpressionParser(configuration);
        final IStandardExpression expression = expressionParser.parseExpression(configuration, arguments, attributeValue);
        final Object result = expression.execute(configuration, arguments);
        return (result == null ? "" : result.toString());
    }
}
