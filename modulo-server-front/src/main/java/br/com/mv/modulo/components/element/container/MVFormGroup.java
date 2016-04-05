package br.com.mv.modulo.components.element.container;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.thymeleaf.Arguments;
import org.thymeleaf.dom.Element;

public class MVFormGroup extends MVDiv{
	
	//FIXME:REMOVER ESTAS PROPRIDADES E ALTERAR A MANEIRA COMO É FEITA A VALIDAÇÃO.
	private Map<String, String> hasError;

	public void setValue(String value) {
		if(hasError == null){
			hasError = new HashMap<>();
		}
		hasError.put("value", value);
	}
	
	public void setRequired(String value) {
		if(hasError == null){
			hasError = new HashMap<>();
		}
		hasError.put("required", value);
	}
	
	public MVFormGroup(Arguments arguments, Element context) {
		super(arguments, context);
		this.el.setAttribute("class", "form-group");
		
		//FIXME:REMOVER O TRECHO ABAIXO E ALTERAR A MANEIRA COMO É FEITA A VALIDAÇÃO.
		StringBuilder hasError = new StringBuilder(); 
		String value = this.hasError.get("value");
		String required = this.hasError.get("required");
		
		if(StringUtils.isNotBlank(value) && StringUtils.isNotBlank(required)){
			hasError.append(required);
			hasError.append(" && ");
			hasError.append(value).append(".isModified()");
			hasError.append(" && ");
			hasError.append("!");
			hasError.append(value).append(".isValid()");
			
			this.koCss.put("'has-error'", hasError.toString());
		}
		
	}
}
