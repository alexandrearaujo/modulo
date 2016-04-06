package br.com.mv.modulo.components.element.autocomplete;

import org.thymeleaf.Arguments;
import org.thymeleaf.dom.Element;

import br.com.mv.modulo.components.element.MVInputText;
import br.com.mv.modulo.components.element.attributes.MVAutocompleteBinding;
import br.com.mv.modulo.components.element.attributes.ThDomAttribute;

public class MVAutocomplete extends MVInputText{

	private MVAutocompleteBinding autocompleteBinding;

	public void setValue(String value){
		autocompleteBinding.setValue(value);
	}
	
	public void setSource(String source) {
		autocompleteBinding.setSource(source);
	}
	
	public void setOptionsValue(String optionsValue) {
		autocompleteBinding.setOptionsValue(optionsValue);
	}
	
	public void setOptionsLabel(String optionsLabel) {
		autocompleteBinding.setOptionsLabel(optionsLabel);
	}
	
	public void setOptionsText(String optionsLabel) {
		autocompleteBinding.setOptionsText(optionsLabel);
	}
	
	public void setValueText(String value) {
		autocompleteBinding.setValueText(value);
	}
	
	public void setParams(String params) {
		autocompleteBinding.setParams(params);
	}
	
	public void setOtherValues(String otherValues) {
		autocompleteBinding.setOtherValues(otherValues);
	}
	
	public MVAutocomplete(Arguments arguments, Element context) {
		super(arguments, context);
		domAttribute.addClassCss("typeahead");
	}
	
	private void initializeAutoCompleteBinding(){
		autocompleteBinding = new MVAutocompleteBinding();
		addDataBind(autocompleteBinding);
	}
	
	@Override
	protected void beforeBuildDataBind(ThDomAttribute domAttribute) {
		super.beforeBuildDataBind(domAttribute);
		this.initializeAutoCompleteBinding();
	}
}
