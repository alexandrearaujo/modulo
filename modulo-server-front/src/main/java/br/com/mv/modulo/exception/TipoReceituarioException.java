package br.com.mv.modulo.exception;

import org.hibernate.HibernateException;

/**
 * Classe responsável para tratar as exeções retornadas do banco de dados.
 * 
 * @mv.uc - UC005 - Manter tipo de receituário
 * 
 * @author Carlos Roberto
 * @version 1 Date: 26/08/2014 12:00
 * 
 */
public class TipoReceituarioException extends HibernateException
{

    private static final long serialVersionUID = 1L;
    
    public static final String EXCEPTION_PK = "Chave primária violada";
    public static final String EXCEPTION_UNIQUE_CONSTRAINT = "Já existe um tipo de receituário cadastrado com esta descrição";
    public static final String EXCEPTION_TP_COR_RECEITUARIO = "O tipo de cor do receituário não pode ser nula";
    public static final String CNT_MEDICAMENTO_TP_RCTRIO_FK = "Este tipo de receituário está sendo utilizado e não pode ser excluído.";
    
    public TipoReceituarioException(String msg)
    {
        super(msg);
    }

    

}
