package br.com.mv.modulo.exception;


public class ExceptionInfo {
	public String url;
	public String ex;
	public String messageType;
	
	public ExceptionInfo(StringBuffer url, GenericException ex) {
		this.url = url.toString();
		this.ex = ex.getCause().getLocalizedMessage();	

		if (ex.getMessageType() != null) {
			this.messageType = ex.getMessageType().getDescricao();
		}
	}
}
