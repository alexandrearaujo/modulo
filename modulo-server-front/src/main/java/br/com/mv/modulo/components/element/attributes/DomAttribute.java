package br.com.mv.modulo.components.element.attributes;

import java.io.Serializable;
import java.util.Map;

import org.thymeleaf.dom.Attribute;

@SuppressWarnings("serial")
public class DomAttribute implements Serializable{
	
	private Map<String, Attribute> map;
	
	public DomAttribute(Map<String, Attribute> map){
		this.map = map;
	}
	
	public Attribute get(String key) {
		key = "mv:" + key;
		return map.get(key);
	}
	
	public String getAttributeValue(String key) {
		Attribute attribute = get(key);
		if(attribute == null){
			return "";
		}
		return attribute.getValue();
	}
}
