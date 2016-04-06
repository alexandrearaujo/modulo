package br.com.mv.modulo.components.element.attributes;

import java.io.Serializable;

import org.apache.commons.lang3.StringUtils;

@SuppressWarnings("serial")
public class MVAutocompleteBinding extends MVAttribute implements Serializable {
	
	public void setSource(String source) {
		if(StringUtils.isNotBlank(source))
			put("source", "'"+ source+"'");
	}
	
	public void setOptionsValue(String optionsValue) {
		if(StringUtils.isNotBlank(optionsValue))
			put("optionsValue", "'"+optionsValue+"'");
	}
	
	public void setOptionsText(String optionsText) {
		if(StringUtils.isNotBlank(optionsText))
			put("optionsText", "'"+optionsText+"'");
	}
	
	public void setOptionsLabel(String optionsLabel) {
		if(StringUtils.isNotBlank(optionsLabel))
			put("optionsLabel", "'"+optionsLabel+"'");
	}

	public void setValue(String value) {
		if (StringUtils.isNotBlank(value)) {
			put("value", value);
		}
	}
	
	public void setValueText(String value) {
		if(StringUtils.isNotBlank(value))
			put("valueText", value);
	}
	
	public void setParams(String params) {
		put("params", params);
	}
	
	public void setOtherValues(String otherValues) {
		put("otherValues", otherValues);
	}

	@Override
	public String stringify() {

		if (map.isEmpty()) {
			return "";
		}

		StringBuilder json = new StringBuilder("mvautocomplete : ");
		json.append(super.stringify());
		return json.toString();
	}
}
