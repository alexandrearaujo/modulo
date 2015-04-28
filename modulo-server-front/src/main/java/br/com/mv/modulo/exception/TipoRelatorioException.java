package br.com.mv.modulo.exception;

import org.hibernate.HibernateException;

/**
 * Classe responsável para tratar as exeções retornadas do banco de dados.
 * 
 * @mv.uc - UC005 - Manter tipo de receituário
 * 
 * @author Carlos Roberto
 * @version 1 Date: 27/08/2014 12:20
 * 
 */
public class TipoRelatorioException extends HibernateException
{

    private static final long serialVersionUID = 1533031805383850345L;
    
    public static final String CNT_TIPO_RELATORIO_PK = "Chave primária violada, entrar em contato com responsável pela base de dados";
    public static final String CNT_TIPO_RELATORIO_1_UK = "O nome do relatório deve ser único";
    
    private TipoRelatorioException(String msg)
    {
        super(msg);
    }
    
}
