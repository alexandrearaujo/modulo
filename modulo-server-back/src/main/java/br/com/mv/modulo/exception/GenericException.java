package br.com.mv.modulo.exception;

import br.com.mv.modulo.model.type.EnumTipoMensagem;
import lombok.Getter;
import lombok.Setter;

@SuppressWarnings("serial")
public class GenericException extends RuntimeException {

	@Getter
	@Setter
	private EnumTipoMensagem messageType;
	
	public GenericException() {
		super();
	}
	
	public GenericException(Throwable cause) {
		super(cause);
		if(cause instanceof GenericException){
			this.messageType = ((GenericException)cause).getMessageType();
		}
	}

	public GenericException(String resourceKey) {
		super(resourceKey);
		this.messageType = EnumTipoMensagem.ERRO;
	}

	public GenericException(String resourceKey, EnumTipoMensagem messageType) {
		this(resourceKey);
		this.messageType = messageType;
	}
}
