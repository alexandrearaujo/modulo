package br.com.mv.modulo.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import br.com.mv.modulo.model.converters.EnumTipoSituacaoVersaoConverter;
import br.com.mv.modulo.model.type.EnumTipoSituacaoVersao;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "VERSAO")
@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class Versao implements Serializable {
    private static final long serialVersionUID = -6503954107647307888L;

    @Id
    @Column(name = "ID_VERSAO")
    private Long id;

    @Column(name = "VERSAO_BANCO")
    private String versaoBanco;
    
    @Column(name = "TP_SITUACAO")
    @Convert(converter = EnumTipoSituacaoVersaoConverter.class)
    private EnumTipoSituacaoVersao situacaoVersao;
    
    @Transient
    private String dataVersao;
    
    @Transient
    private String versaoSistema;
    
    @Transient
    private String schemaBanco;
    
    @Transient
    private String usuarioBanco;
    
    @Transient
    private String servidorBanco;
    
    @Transient
    private String ipAddress;
    
    @Transient
    private String licenseDaysLeft;

    
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Versao other = (Versao) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
}