package br.com.mv.modulo.components.element.attributes;

import java.io.Serializable;
import java.util.Collections;
import java.util.Map;

@SuppressWarnings("serial")
public class DomAttribute extends MVAttribute implements Serializable{
	public void setId(String id) {
		this.put("id", id);
	}
	
	public void setFor(String tagFor) {
		this.put("for", tagFor);
	}
	
	public void setMaxlength(String maxLength) {
		this.put("maxlength", maxLength);
	}
	
	public Map<String, String> getAttributes(){
		return Collections.unmodifiableMap(map);
	}
	
	
}
