package br.com.mv.modulo.components.element.attributes;

import java.io.Serializable;

@SuppressWarnings("serial")
public class KoAttr extends MVAttribute implements Serializable {
	
	public void setDisable(String disable) {
		this.put("disabled", disable);
	}
	
	@Override
	public String stringify() {

		if (map.isEmpty()) {
			return "";
		}

		StringBuilder json = new StringBuilder("attr : ");
		json.append(super.stringify());
		return json.toString();
	}
}
