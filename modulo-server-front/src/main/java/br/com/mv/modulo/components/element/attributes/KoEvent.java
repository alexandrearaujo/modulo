package br.com.mv.modulo.components.element.attributes;

import java.io.Serializable;

@SuppressWarnings("serial")
public class KoEvent extends MVAttribute implements Serializable{

	public void setClick(String value){
		this.put("click", value);
	}
	
	public void setDbClick(String value){
		this.put("dbclick", value);
	}
	
	public void setFocus(String value){
		this.put("focus", value);
	}
	
	public void setFocusIn(String value){
		this.put("focusin", value);
	}
	
	public void setFocusOut(String value){
		this.put("focusout", value);
	}
	
	public void setBlur(String value){
		this.put("blur", value);
	}
	
	public void setChange(String value){
		this.put("change", value);
	}
	
	public void setKeyPress(String value){
		this.put("keypress", value);
	}
	
	public void setKeyDown(String value){
		this.put("keydown", value);
	}
	
	public void setKeyUp(String value){
		this.put("keyup", value);
	}
	
	public void setReset(String value){
		this.put("reset", value);
	}
	
	public void setSelect(String value){
		this.put("select", value);
	}
	
	public void setSubmit(String value){
		this.put("submit", value);
	}
	
	@Override
	public String stringify() {

		if (map.isEmpty()) {
			return "";
		}

		StringBuilder json = new StringBuilder("event : ");
		json.append(super.stringify());
		return json.toString();
	}
}
