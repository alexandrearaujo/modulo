package br.com.mv.modulo.model;

public enum UserRoles {

	USER("USER"), ADMIN("ADMIN"), MEDICO("MEDICO");
	
	UserRoles(String value) {
		this.value = value;
	}

	private String value;

	public String getValue() {
		return value;
	}
	
	
}
