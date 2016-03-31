package br.com.mv.modulo.components.element;

import org.apache.commons.lang3.StringUtils;
import org.thymeleaf.dom.Element;

public class MVDivElementGenerator {
	
	private String mvClass;
	private String mvDataBind;
	
	private static final String CLASS_ATTRIBUTE = "class";
	private static final String DATA_BIND_ATTRIBUTE = "data-bind";
	
	private Element div = new Element("div");
	
	
	public MVDivElementGenerator(String mvClass, String mvDataBind) {
		setMvClass(mvClass);
		setMvDataBind(mvDataBind);
	}
	
	public MVDivElementGenerator(String mvClass) {
		setMvClass(mvClass);
		setMvDataBind(null);
	}
	
	
	public Element getDiv() {
		return this.div;
	}
	
	public void setMvClass(String mvClass) {
		if (StringUtils.isNotBlank(this.mvClass)) {
			div.setAttribute(CLASS_ATTRIBUTE, this.mvClass.concat(" ").concat(mvClass));
		} else {
			this.mvClass = mvClass;
			div.setAttribute(CLASS_ATTRIBUTE, mvClass);
		}
	}
	
	public void setMvDataBind(String mvDataBind) {
		if (StringUtils.isNotBlank(this.mvDataBind)) {
			this.mvDataBind = this.mvDataBind.concat(mvDataBind);
		} else {
			this.mvDataBind = mvDataBind;
		}
		div.setAttribute(DATA_BIND_ATTRIBUTE, this.mvDataBind);
	}

}
