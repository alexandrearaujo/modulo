package br.com.mv.modulo.components.element.attributes;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;

public abstract class MVAttribute {
	protected Map<String,String> map;
	
	public MVAttribute(){
		this.map = new HashMap<>();
	}
	
	public String put(String key, String value) {
		if(StringUtils.isNotBlank(value)){
			return map.put(key, value);
		}
		return "";
	}
	
	public String get(String key) {
		if(StringUtils.isNotBlank(key)){
			return map.get(key);
		}
		return "";
	}
	
	public String stringify(){
		StringBuilder json = new StringBuilder();
		json.append(map.toString().replaceAll("=", ":"));
		return json.toString();
	}
}
