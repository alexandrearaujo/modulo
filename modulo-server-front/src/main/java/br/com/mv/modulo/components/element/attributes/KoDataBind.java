package br.com.mv.modulo.components.element.attributes;

import java.util.ArrayList;

import org.apache.commons.lang3.StringUtils;

@SuppressWarnings("serial")
public class KoDataBind extends ArrayList<String>{

	public boolean add(MVAttribute e) {
		if(StringUtils.isNotEmpty(e.stringify())){
			return super.add(e.stringify());
		}
		
		return false;
	}
	
	public String stringify() {

		if (this.isEmpty()) {
			return StringUtils.EMPTY;
		}

		StringBuilder json = new StringBuilder();
		json.append(this.toString().replace("[", StringUtils.EMPTY).replace("]", StringUtils.EMPTY));
		return json.toString();
	}
}
