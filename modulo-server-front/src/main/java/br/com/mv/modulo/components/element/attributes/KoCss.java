package br.com.mv.modulo.components.element.attributes;

import java.io.Serializable;

import org.apache.commons.lang3.StringUtils;

import br.com.mv.modulo.components.helper.MVHelper;

@SuppressWarnings("serial")
public class KoCss extends MVAttribute implements Serializable{
	
	public void addClassCss(String classCss){
		if(StringUtils.isNotEmpty(classCss)){
			this.put(MVHelper.wrapWithQuotes(classCss), "true");
		}
	}
	
	public void setRequired(String required) {
		this.put("'required'", required);
	}

	@Override
	public String stringify() {

		if (map.isEmpty()) {
			return "";
		}

		StringBuilder json = new StringBuilder("css : ");
		json.append(super.stringify());
		return json.toString();
	}
}
