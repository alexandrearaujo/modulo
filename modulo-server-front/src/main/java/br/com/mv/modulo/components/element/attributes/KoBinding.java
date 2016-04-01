package br.com.mv.modulo.components.element.attributes;

import java.io.Serializable;

import org.apache.commons.lang3.StringUtils;

@SuppressWarnings("serial")
public class KoBinding extends MVAttribute implements Serializable{
	
	public void setValue(String value) {
		this.put("value", value);
	}
	
	public void setText(String text) {
		if(StringUtils.isNotBlank(text)){
			this.put("text", "'"+text+"'");
		}
	}

	public void setVisible(String visible) {
		this.put("visible", visible);
	}

	public void setClick(String click) {
		this.put("click", click);
	}

	public void setSubmit(String submit) {
		this.put("submit", submit);
	}

	public void setEnable(String enable) {
		this.put("enable", enable);
	}

	public void setDisable(String disable) {
		this.put("disable", disable);
	}

	public void setHasFocus(String hasFocus) {
		this.put("hasFocus", hasFocus);
	}

	public void setChecked(String checked) {
		this.put("checked", checked);
	}

	public void setOptions(String options) {
		this.put("options", options);
	}

	public void setSelectedOptions(String selectedOptions) {
		this.put("selectedOptions", selectedOptions);
	}

	public void setUniqueName(String uniqueName) {
		this.put("uniqueName", uniqueName);
	}
	
	@Override
	public String stringify() {

		if (map.isEmpty()) {
			return "";
		}

		StringBuilder json = new StringBuilder();
		json.append(super.stringify().replace("{", "").replace("}", ""));
		return json.toString();
	}
}
