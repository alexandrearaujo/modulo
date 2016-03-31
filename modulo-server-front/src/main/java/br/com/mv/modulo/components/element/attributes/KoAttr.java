package br.com.mv.modulo.components.element.attributes;

import java.util.HashMap;

import org.apache.commons.lang3.StringUtils;

@SuppressWarnings("serial")
public class KoAttr extends HashMap<String,String> implements MVAttribute{

	public void setId(String id) {
		this.put("id", id);
	}
	
	public void setFor(String tagFor) {
		this.put("for", tagFor);
	}
	
	public void setMaxLength(String maxLength) {
		this.put("maxLength", maxLength);
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
		
		StringBuilder json = new StringBuilder("attr : ");
		json.append(this.toString().replaceAll("=", ":"));
		return json.toString();
	}
}
