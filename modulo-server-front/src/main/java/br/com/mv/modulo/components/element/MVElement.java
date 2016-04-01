package br.com.mv.modulo.components.element;

import java.beans.Statement;
import java.lang.reflect.Method;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.text.WordUtils;
import org.thymeleaf.Arguments;
import org.thymeleaf.Configuration;
import org.thymeleaf.dom.Element;
import org.thymeleaf.standard.expression.IStandardExpression;
import org.thymeleaf.standard.expression.IStandardExpressionParser;
import org.thymeleaf.standard.expression.StandardExpressions;
import org.thymeleaf.util.Validate;

import br.com.mv.modulo.components.element.attributes.DomAttribute;
import br.com.mv.modulo.components.element.attributes.KoAttr;
import br.com.mv.modulo.components.element.attributes.KoBinding;
import br.com.mv.modulo.components.element.attributes.KoCss;
import br.com.mv.modulo.components.element.attributes.KoDataBind;
import br.com.mv.modulo.components.element.attributes.KoEvent;
import br.com.mv.modulo.components.element.attributes.MvInputMask;
import br.com.mv.modulo.components.element.attributes.MvTooltipError;
import lombok.Getter;
import lombok.Setter;

public abstract class MVElement {

	@Getter @Setter
	protected Element el;
	
	private Arguments arguments;

	protected KoCss koCss;

	protected KoAttr koAttr;

	protected KoBinding koBinding;

	protected KoEvent koEvent;
	
	protected MvInputMask maskBinding;
	
	protected MvTooltipError tooltipError;
	
	public MVElement(Arguments arguments, Element context) {
		DomAttribute domAttribute = new DomAttribute(context.getAttributeMap());
		Validate.notNull(domAttribute.get("id"), "Atributo 'id' é obrigatório");
		
		this.arguments = arguments;
		this.koAttr = new KoAttr();
		this.koBinding = new KoBinding();
		this.koEvent = new KoEvent();
		this.koCss = new KoCss();
		this.maskBinding = new MvInputMask();
		this.tooltipError = new MvTooltipError();
		
		this.build(domAttribute);
	}
	
	private String getDataBind() {
		KoDataBind dataBind = new KoDataBind();

		dataBind.add(koBinding);
		dataBind.add(koEvent);
		dataBind.add(koAttr);
		dataBind.add(koCss);
		dataBind.add(maskBinding);
		dataBind.add(tooltipError);
		
		return dataBind.stringify();
	}

	public MVElement render() {
		el.setAttribute("data-bind", getDataBind());
		return this;
	}
	
	private void build(DomAttribute domAttribute){
		try {
			for (Method method : getClass().getDeclaredMethods()) {
				if(method.getName().startsWith("set")){
					String property = WordUtils.uncapitalize(method.getName().replace("set", ""));
					Statement s = new Statement(this, method.getName(), new Object[]{domAttribute.getAttributeValue(property)});
					s.execute();
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	protected final String getI8n(String value) {
		if(StringUtils.isBlank(value)){
			return "";
		}
		
        final Configuration configuration = arguments.getConfiguration();
        final IStandardExpressionParser expressionParser = StandardExpressions.getExpressionParser(configuration);
        final IStandardExpression expression = expressionParser.parseExpression(configuration, arguments, "#{"+value+"}");
        final Object result = expression.execute(configuration, arguments);
        return (result == null ? "" : result.toString());
    }
}
