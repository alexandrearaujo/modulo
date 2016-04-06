package br.com.mv.modulo.components.element.attributes;

import java.io.Serializable;
import java.util.Collections;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;

@SuppressWarnings("serial")
public class DomAttribute extends MVAttribute implements Serializable{
	
	private Set<String> classesCss;
	
	public DomAttribute(){
		this.classesCss = new HashSet<>();
	}
	
	public void setId(String id) {
		this.put("id", id);
	}
	
	public void setFor(String tagFor) {
		this.put("for", tagFor);
	}
	
	public void setMaxlength(String maxLength) {
		this.put("maxlength", maxLength);
	}
	
	public void addClassCss(String classCss){
		if(StringUtils.isNotBlank(classCss)){
			this.classesCss.add(classCss);
		}
	}
	
	public String getClassesCss(){
		if(!classesCss.isEmpty()){
			return this.classesCss.toString()
								  .replace("[", StringUtils.EMPTY)
								  .replace("]", StringUtils.EMPTY)
								  .replace(",", StringUtils.EMPTY);
		}
		return StringUtils.EMPTY;
	}
	
	public Map<String, String> getAttributes(){
		return Collections.unmodifiableMap(map);
	}
	
	
}
