package br.com.mv.modulo.components.element.attributes;

import java.io.Serializable;

@SuppressWarnings("serial")
public class MVValidation extends MVAttribute implements Serializable{
	public void setValue(String value){
		put("value", value);
	}
	
	@Override
	public String stringify() {

		if (map.isEmpty()) {
			return "";
		}

		StringBuilder json = new StringBuilder("tooltipError : ");
		json.append(super.stringify());
		return json.toString();
	}
}
