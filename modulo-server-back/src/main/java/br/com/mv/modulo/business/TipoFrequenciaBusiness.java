package br.com.mv.modulo.business;

import java.util.ArrayList;
import java.util.Calendar;

import javax.annotation.Nonnull;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.mv.modulo.exception.GenericException;
import br.com.mv.modulo.model.DetalheTipoFrequencia;
import br.com.mv.modulo.model.TipoFrequencia;
import br.com.mv.modulo.repository.TipoFrequenciaRepository;

@Service
@Transactional(readOnly=true)
public class TipoFrequenciaBusiness {

	private final TipoFrequenciaRepository tipoFrequenciaRepository;
	
//	private final ItemSolicitacaoMedicamentoRepository itemSolicitacaoMedicamentoRepository;
	
	
	@Autowired
	public TipoFrequenciaBusiness(TipoFrequenciaRepository tipoFrequenciaRepository
//			, 
//			ItemSolicitacaoMedicamentoRepository itemSolicitacaoMedicamentoRepository
			) {
		this.tipoFrequenciaRepository = tipoFrequenciaRepository;
//		this.itemSolicitacaoMedicamentoRepository = itemSolicitacaoMedicamentoRepository;
	}

	public Page<TipoFrequencia> listTipoFrequencia(@Nonnull final TipoFrequencia tipoFrequencia, Pageable pageable) {
		String descricaoFrequenciaLiked = null;
		if (StringUtils.isNotBlank(tipoFrequencia.getDescricaoFrequencia())) {
			descricaoFrequenciaLiked = "%" + tipoFrequencia.getDescricaoFrequencia() + "%";
		}
		
		if (StringUtils.isNotBlank(tipoFrequencia.getDescricaoFrequencia()) && tipoFrequencia.getPeriodicidade() != null && tipoFrequencia.getHorarioInicial() != null) {
			return tipoFrequenciaRepository.findByDescricaoFrequenciaLikeIgnoreCaseAndPeriodicidadeAndHorarioInicial(descricaoFrequenciaLiked, 
				    tipoFrequencia.getPeriodicidade(), tipoFrequencia.getHorarioInicial(), pageable);
		} else if (StringUtils.isNotBlank(tipoFrequencia.getDescricaoFrequencia()) && tipoFrequencia.getPeriodicidade() != null) {
			return tipoFrequenciaRepository.findByDescricaoFrequenciaLikeIgnoreCaseAndPeriodicidade(descricaoFrequenciaLiked,
					tipoFrequencia.getPeriodicidade(), pageable);
		} else if (StringUtils.isNotBlank(tipoFrequencia.getDescricaoFrequencia()) && tipoFrequencia.getHorarioInicial() != null) {
			return tipoFrequenciaRepository.findByDescricaoFrequenciaLikeIgnoreCaseAndHorarioInicial(descricaoFrequenciaLiked, tipoFrequencia.getHorarioInicial(), pageable);
		} else if (tipoFrequencia.getPeriodicidade() != null && tipoFrequencia.getHorarioInicial() != null) {
			return tipoFrequenciaRepository.findByPeriodicidadeAndHorarioInicial(tipoFrequencia.getPeriodicidade(), tipoFrequencia.getHorarioInicial(), pageable);
		} else if (StringUtils.isNotBlank(tipoFrequencia.getDescricaoFrequencia())) {
			return tipoFrequenciaRepository.findByDescricaoFrequenciaLikeIgnoreCase(descricaoFrequenciaLiked, pageable);
		} else if (tipoFrequencia.getPeriodicidade() != null) {
			return tipoFrequenciaRepository.findByPeriodicidade(tipoFrequencia.getPeriodicidade(), pageable);
		} else if (tipoFrequencia.getHorarioInicial() != null) {
			return tipoFrequenciaRepository.findByHorarioInicial(tipoFrequencia.getHorarioInicial(), pageable);
		} else {
			return tipoFrequenciaRepository.findAll(pageable);
		}
	}
	
	public TipoFrequencia adicionarHorariosMedicacao(@Nonnull TipoFrequencia tipoFrequencia) {
		if (tipoFrequencia.getDetalhes() == null) {
			tipoFrequencia.setDetalhes(new ArrayList<DetalheTipoFrequencia>());
		}
		
		Double quantidade = Math.ceil(24f / tipoFrequencia.getPeriodicidade().floatValue());
		
		Calendar cal = Calendar.getInstance();
		cal.setTime(tipoFrequencia.getHorarioInicial());
		
		DetalheTipoFrequencia detalheTipoFrequenciaInicial = new DetalheTipoFrequencia();
		detalheTipoFrequenciaInicial.setHoraMedicacao(cal.getTime());
		detalheTipoFrequenciaInicial.setTipoFrequencia(tipoFrequencia);
		tipoFrequencia.getDetalhes().add(detalheTipoFrequenciaInicial);
		
		for (int i = 1; i < quantidade.intValue(); i++ ) {
			cal.add(Calendar.HOUR_OF_DAY, tipoFrequencia.getPeriodicidade());
			
			DetalheTipoFrequencia detalheTipoFrequencia = new DetalheTipoFrequencia();
			detalheTipoFrequencia.setHoraMedicacao(cal.getTime());
			detalheTipoFrequencia.setTipoFrequencia(tipoFrequencia);
			tipoFrequencia.getDetalhes().add(detalheTipoFrequencia);
		}
		
		return tipoFrequencia;
	}

	@Transactional
	public void save(TipoFrequencia tipoFrequencia) throws GenericException {
		tipoFrequenciaRepository.save(tipoFrequencia);
 	}

	@Transactional
	public boolean delete(Long id) throws IllegalArgumentException {
		boolean existsItemSolicitacao = existsItemSolicitacaoMedicamentoForTipoFrequencia(id);
		if (!existsItemSolicitacao) {
			tipoFrequenciaRepository.delete(id);
			return true;
		} else {
			return false;
		}
	}

	public TipoFrequencia findOne(Long id) {
		return tipoFrequenciaRepository.findOne(id);
	}
	
	public Page<TipoFrequencia> findByDescricao(String term, Pageable pageable) {
		return tipoFrequenciaRepository.findByDescricaoFrequenciaLikeIgnoreCase(term, pageable);
	}
	
	public boolean existsItemSolicitacaoMedicamentoForTipoFrequencia(Long id) {
//		Long countItemSolicitacaoMedicamento = itemSolicitacaoMedicamentoRepository.checkExistsItemSolicitacaoMedicamentoForTipoFrequencia(id);
		Long countItemSolicitacaoMedicamento = 0L;
		if (countItemSolicitacaoMedicamento.equals(0L)) {
			return false;
		} else {
			return true;
		}
	}

}