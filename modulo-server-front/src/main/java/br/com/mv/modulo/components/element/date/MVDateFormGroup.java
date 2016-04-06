package br.com.mv.modulo.components.element.date;

import org.thymeleaf.Arguments;
import org.thymeleaf.dom.Element;

import br.com.mv.modulo.components.element.attributes.ThDomAttribute;
import br.com.mv.modulo.components.element.attributes.MVDateBinding;
import br.com.mv.modulo.components.element.container.MVFormGroup;

public class MVDateFormGroup extends MVFormGroup{

	protected MVDateBinding dateBinding;
	
	public void setValue(String value){
		koBinding.setValue(value);
	}
	
	public void setDisable(String value){
		koBinding.setDisable(value);
	}
	
	public void setOptions(String options){
		dateBinding.setOptions(options);
	}
	
	private void initializeDateBinding(){
		this.dateBinding = new MVDateBinding();
		this.setOptions("{}");
		this.addDataBind(dateBinding);
	}
	
	@Override
	protected void beforeBuildDataBind(ThDomAttribute domAttribute) {
		super.beforeBuildDataBind(domAttribute);
		this.initializeDateBinding();
	}
	
	@Override
	protected void afterBuildDataBind(ThDomAttribute domAttribute) {
		super.afterBuildDataBind(domAttribute);
		dateBinding.setValue(koBinding.get("value"));
	}
	
	public MVDateFormGroup(Arguments arguments, Element context) {
		super(arguments, context);
		this.domAttribute.addClassCss("date");
		this.domAttribute.addClassCss("date-field");
	}

}
