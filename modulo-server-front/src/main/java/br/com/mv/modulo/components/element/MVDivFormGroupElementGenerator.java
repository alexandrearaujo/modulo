package br.com.mv.modulo.components.element;

public class MVDivFormGroupElementGenerator extends MVDivElementGenerator {
	
	protected static String mvClass = "form-group";
	
//	protected static String mvBindCss = "css: { \'has-error\' : value.hasOwnProperty(\'isModified\') value.isModified() && !value.isValid() }";
	protected static String mvBindCss = "css: { \'has-error\' : value.isModified() && !value.isValid() }";
	
	
	public MVDivFormGroupElementGenerator() {
		super(mvClass, mvBindCss);
	}

}
