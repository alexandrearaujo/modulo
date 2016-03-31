package br.com.mv.modulo.components.element;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.thymeleaf.dom.Element;

public class MVDivElementGenerator {
	
	private String mvClass;
	private String mvDataBind;
	
	private Map<String, String> mvDataBindAttr = new HashMap<String, String>();
	private Map<String, String> mvDataBindCss = new HashMap<String, String>();
	
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
		div.setAttribute(DATA_BIND_ATTRIBUTE, this.mvDataBind.concat(generateDataBindAttr()).concat(generateDataBindCss()));
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
			this.mvDataBind = mvDataBind.concat(", ").concat(this.mvDataBind);
		} else {
			this.mvDataBind = mvDataBind;
		}
	}
	
	public void addMvDataBindAttr(String key, String value) {
		mvDataBindAttr.put(key, value);
	}
	
	public void addMvDataBindCss(String key, String value) {
		mvDataBindCss.put(key, value);
	}
	
	protected String generateDataBindAttr() {
		if (mvDataBindAttr.isEmpty()) {
			return "";
		}
		
		String dataBindAttr = ", attr: { ";
		for (Map.Entry<String, String> entry : this.mvDataBindAttr.entrySet()) {
			dataBindAttr = dataBindAttr + entry.getKey() + " : " + entry.getValue() + ",";
		}
		return dataBindAttr.substring(0, dataBindAttr.length() - 1) + " }";
	}
	
	protected String generateDataBindCss() {
		if (mvDataBindCss.isEmpty()) {
			return "";
		}
		
		String dataBindCss = ", css: { ";
		for (Map.Entry<String, String> entry : this.mvDataBindCss.entrySet()) {
			dataBindCss = dataBindCss + entry.getKey() + " : " + entry.getValue() + ",";
		}
		return dataBindCss.substring(0, dataBindCss.length() - 1) + " }";
	}

}
