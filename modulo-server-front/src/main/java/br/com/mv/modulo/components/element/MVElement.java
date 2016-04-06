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
import br.com.mv.modulo.components.element.attributes.KoBinding;
import br.com.mv.modulo.components.element.attributes.KoCss;
import br.com.mv.modulo.components.element.attributes.KoDataBind;
import br.com.mv.modulo.components.element.attributes.KoEvent;
import br.com.mv.modulo.components.element.attributes.MVAttribute;
import br.com.mv.modulo.components.element.attributes.MVInputMask;
import br.com.mv.modulo.components.element.attributes.MVTooltipError;
import br.com.mv.modulo.components.element.attributes.ThDomAttribute;
import lombok.Getter;
import lombok.Setter;

public abstract class MVElement {

	@Getter @Setter
	protected Element el;
	
	private Arguments arguments;

	protected DomAttribute domAttribute;
	
	protected KoCss koCss;

	protected KoBinding koBinding;

	protected KoEvent koEvent;
	
	protected MVInputMask maskBinding;
	
	protected MVTooltipError tooltipError;
	
	protected ThDomAttribute thDomAttribute;
	
	private KoDataBind dataBind;
	
	public MVElement(Arguments arguments, Element context) {
		ThDomAttribute domAttribute = new ThDomAttribute(context.getAttributeMap());
		Validate.notNull(domAttribute.get("id"), "Atributo 'id' é obrigatório");
		Validate.notNull(domAttribute.get("value"), "Atributo 'value' é obrigatório");
		
		this.arguments = arguments;
		this.domAttribute = new DomAttribute();
		this.dataBind = new KoDataBind();
		this.koBinding = new KoBinding();
		this.koEvent = new KoEvent();
		this.koCss = new KoCss();
		this.maskBinding = new MVInputMask();
		this.tooltipError = new MVTooltipError();
		
		this.beforeBuildDataBind(domAttribute);
		this.buildDataBind(domAttribute);
		this.afterBuildDataBind(domAttribute);
		
	}
	
	private void addDataBindAttributes() {
		dataBind.add(koBinding);
		dataBind.add(koEvent);
		dataBind.add(koCss);
		dataBind.add(maskBinding);
		dataBind.add(tooltipError);
	}

	public MVElement render() {
		addDataBindAttributes();
		
		domAttribute.getAttributes().entrySet().stream().forEach(attr -> el.setAttribute(attr.getKey(), attr.getValue()) );
		
		if(!dataBind.stringify().isEmpty())
			el.setAttribute("data-bind", dataBind.stringify());
		
		if(!domAttribute.getClassesCss().isEmpty())
			el.setAttribute("class", domAttribute.getClassesCss());
		
		return this;
	}
	
	private void buildDataBind(ThDomAttribute domAttribute){
		try {
			executeMethodsSuperClass(domAttribute, getClass().getSuperclass());
			executeMethods(domAttribute);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	protected void addDataBind(MVAttribute mvAttribute){
		dataBind.add(mvAttribute);
	}
	
	protected void afterBuildDataBind(ThDomAttribute domAttribute){}
	
	protected void beforeBuildDataBind(ThDomAttribute domAttribute){}
	
	private void executeMethods(ThDomAttribute domAttribute)throws Exception{
		for (Method method : getClass().getDeclaredMethods()) {
			if(method.getName().startsWith("set")){
				String property = WordUtils.uncapitalize(method.getName().replace("set", ""));
				Statement s = new Statement(this, method.getName(), new Object[]{domAttribute.getAttributeValue(property)});
				s.execute();
			}
		}
	}
	
	private void executeMethodsSuperClass(ThDomAttribute domAttribute, @SuppressWarnings("rawtypes") Class superClass) throws Exception{
		
		if(!superClass.getName().equals(MVElement.class.getName())){
		
			executeMethodsSuperClass(domAttribute, superClass.getSuperclass());
			
			for (Method method : superClass.getDeclaredMethods()) {
				if(method.getName().startsWith("set")){
					String property = WordUtils.uncapitalize(method.getName().replace("set", ""));
					Statement s = new Statement(this, method.getName(), new Object[]{domAttribute.getAttributeValue(property)});
					s.execute();
				}
			}
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
