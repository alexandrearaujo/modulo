package br.com.mv.modulo.components.element.attributes;

import java.util.HashMap;

import org.apache.commons.lang3.StringUtils;

@SuppressWarnings("serial")
public class KoCss extends HashMap<String,String> implements MVAttribute{

	public void setRequired(String required) {
		this.put("'required'", required);
	}
	
	public void addClassCss(String classCss){
		if(StringUtils.isNotEmpty(classCss)){
			this.put("'"+classCss+"'", "true");
		}
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
		
		StringBuilder json = new StringBuilder("css : ");
		json.append(this.toString().replaceAll("=", ":"));
		return json.toString();
	}
}
