package br.com.mv.modulo.components.element;

public class MVDivFormGroupElementGenerator extends MVDivElementGenerator {
	
	protected static String mvClass = "form-group";
	
	
	public MVDivFormGroupElementGenerator() {
		super(mvClass);
		super.addMvDataBindCss("\'has-error\'", "value.hasOwnProperty(\'isModified\') value.isModified() && !value.isValid()");
	}

}
