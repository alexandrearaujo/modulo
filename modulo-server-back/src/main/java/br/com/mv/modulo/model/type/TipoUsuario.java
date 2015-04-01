package br.com.mv.modulo.model.type;

public enum TipoUsuario {

	USUARIO(0L), ADMINISTRADOR(1L), ROOT(2L);

	TipoUsuario(Long value) {
		this.value = value;
	}

	private Long value;

	public Long getValue() {
		return value;
	}

}
