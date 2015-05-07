package br.com.mv.modulo.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="TESTE")
@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class Teste implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 7929915464761772169L;
	

	@Id
    @SequenceGenerator(name = "SEQ_TESTE", sequenceName = "SEQ_TESTE", allocationSize = 0)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator ="SEQ_TESTE" )
    @Column(name = "ID", length = 8, nullable = false)
    private Long id;
	
	@Column(name = "TESTE")
    @NotNull
    @Size(max = 100)
    private String descricao;

	
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
		Teste other = (Teste) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
}