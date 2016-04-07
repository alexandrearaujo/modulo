package br.com.mv.modulo.components.helper;

import org.apache.commons.lang3.StringUtils;

public class MVHelper {
	public static String wrapWithQuotes(String str){
		if(StringUtils.isNotEmpty(str)){
			return StringUtils.join("'", str, "'");
		}
		return "";
	}
	
	
}
