package br.com.mv.modulo.model.converters;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import br.com.mv.modulo.model.type.EnumTipoSituacaoVersao;

@Converter
public class EnumTipoSituacaoVersaoConverter implements AttributeConverter<EnumTipoSituacaoVersao, Long> {

	@Override
	public Long convertToDatabaseColumn(EnumTipoSituacaoVersao attribute) {
		if (attribute == null) {
            return null;
        }
		
		return attribute.getSituacaoVersao();
	}

	@Override
	public EnumTipoSituacaoVersao convertToEntityAttribute(Long dbData) {
		if (dbData == null) {
            return null;
        }
		
		return EnumTipoSituacaoVersao.fromSituacaoVersao(dbData);
	}

}