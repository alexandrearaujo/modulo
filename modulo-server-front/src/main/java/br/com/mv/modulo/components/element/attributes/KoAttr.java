package br.com.mv.modulo.components.element.attributes;

import java.io.Serializable;

@SuppressWarnings("serial")
public class KoAttr extends MVAttribute implements Serializable{

	public void setId(String id) {
		this.put("id", id);
	}
	
	public void setFor(String tagFor) {
		this.put("for", tagFor);
	}
	
	public void setMaxlength(String maxLength) {
		this.put("maxlength", maxLength);
	}

	public String stringify(){
		
		if(map.isEmpty()){
			return "";
		}
		
		StringBuilder json = new StringBuilder("attr : ");
		json.append(super.stringify());
		return json.toString();
	}
}
