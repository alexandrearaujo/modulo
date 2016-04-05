package br.com.mv.modulo.components.element.attributes;

import java.io.Serializable;

import org.apache.commons.lang3.StringUtils;

@SuppressWarnings("serial")
public class MVInputMask extends MVAttribute implements Serializable{

	public void setMask(String value){
		put("mask", value);
	}
	
	public void setValue(String value){
		if(StringUtils.isNotBlank(get("mask"))){
			put("value", value);
		}
	}

	@Override
	public String stringify() {

		if (map.isEmpty()) {
			return "";
		}

		StringBuilder json = new StringBuilder("inputMask : ");
		json.append(super.stringify());
		return json.toString();
	}
}
