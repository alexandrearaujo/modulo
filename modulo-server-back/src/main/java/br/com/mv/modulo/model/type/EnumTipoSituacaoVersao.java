package br.com.mv.modulo.model.type;

import java.util.Arrays;

public enum EnumTipoSituacaoVersao {
	
	LIBERADO(1L),
	ATUALIZANDO(2L),
	BLOQUEADO(3L);
	
	private Long situacaoVersao;
	
	private EnumTipoSituacaoVersao(Long situacaoVersao) {
		this.situacaoVersao = situacaoVersao;
	}
	
	public static EnumTipoSituacaoVersao fromSituacaoVersao(Long situacaoEnumVersao) {
		return Arrays.asList(EnumTipoSituacaoVersao.values())
				.stream()
				.filter(enumTipoSituacaoVersao -> enumTipoSituacaoVersao.getSituacaoVersao().equals(situacaoEnumVersao))
				.findFirst()
				.get();
	}
	
	public Long getSituacaoVersao() {
		return situacaoVersao;
	}

}
