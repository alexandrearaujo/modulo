package br.com.mv.modulo.components.element.attributes;

import java.util.HashMap;

import org.apache.commons.lang3.StringUtils;

@SuppressWarnings("serial")
public class KoBinding extends HashMap<String,String> implements MVAttribute{
	
	public void setValue(String value) {
		this.put("value", value);
	}
	
	public void setText(String text) {
		this.put("text", "'"+text+"'");
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
		this.put("enable", disable);
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
	public String put(String key, String value) {
		if(StringUtils.isNotEmpty(value)){
			return super.put(key, value);
		}
		return "";
	}
	
	public String stringify(){
		
		if(this.isEmpty()){
			return "";
		}
		
		StringBuilder json = new StringBuilder("");
		json.append(this.toString().replace("{", "").replaceAll("}", "").replace("=", ":"));
		return json.toString();
	}
}
