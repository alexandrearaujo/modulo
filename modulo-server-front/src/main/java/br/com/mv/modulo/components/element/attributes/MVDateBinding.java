package br.com.mv.modulo.components.element.attributes;

import java.io.Serializable;

import org.apache.commons.lang3.StringUtils;

@SuppressWarnings("serial")
public class MVDateBinding extends MVAttribute implements Serializable{
	
	public void setOptions(String options){
		put("options", options);
	}
	
	public void setDisable(String disable){
		put("disable", disable);
	}
	
	public void setValue(String value){
		if(StringUtils.isNotBlank(get("options"))){
			put("value", value);
		}
	}
	
	@Override
	public String stringify() {

		if (map.isEmpty()) {
			return "";
		}

		StringBuilder json = new StringBuilder("mvDate : ");
		json.append(super.stringify());
		return json.toString();
	}
}
