package br.com.mv.modulo.exception;

import org.hibernate.HibernateException;

public class MarcaMedicamentoException extends HibernateException {

    /**
	 * Generated By IDE
	 */
	private static final long serialVersionUID = -4534096063242244216L;
	
	public static final String MARCA_MEDICAMENTO_JA_CADASTRADA = "Já existe uma marca de medicamento cadastrada com o nome informado.";
    public static final String MARCA_MEDICAMENTO_VINCULADA = "Marca de medicamento não pode ser excluída pois já está sendo utilizada.";
    
    
    public MarcaMedicamentoException(String msg)
    {
        super(msg);
    }
}