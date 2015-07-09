package br.com.mv.modulo.model;

public enum UserRoles {

	USER("USER"), ADMIN("ADMIN"), MEDICO("MEDICO");
	
	private String value;
	
	UserRoles(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}
}