package br.com.mv.modulo.exception;

import org.hibernate.HibernateException;

/**
 * Classe responsável para tratar as exeções retornadas do banco de dados.
 * 
 * @mv.uc - UC005 - Manter tipo de receituário
 * 
 * @author Carlos Roberto
 * @version 1 Date: 27/08/2014 12:00
 * 
 */
public class TipoReceituarioRelatorioException extends HibernateException
{
    private static final long serialVersionUID = -3563000529763856595L;
    
    public static final String CNT_TIPO_RECEITUARIO_REL_1_UK = "O tipo receituário e tipo relatório já está sendo utilizados";
    public static final String TIPO_RECEITUARIO_MSG_RELATORIO_ATIVO = "Cadastrar pelo menos um relatório ativo para o tipo de receituário.";
    
    
    public TipoReceituarioRelatorioException(String msg)
    {
        super(msg);
    }

}
