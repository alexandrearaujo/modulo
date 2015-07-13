package br.com.mv.modulo.model.type;

public enum TipoUsuario {

	USUARIO(0L), ADMINISTRADOR(1L), ROOT(2L);

	private Long value;
	
	TipoUsuario(Long value) {
		this.value = value;
	}

	public Long getValue() {
		return value;
	}
}