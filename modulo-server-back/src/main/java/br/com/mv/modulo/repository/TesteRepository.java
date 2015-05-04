package br.com.mv.modulo.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import br.com.mv.modulo.model.Teste;

@Repository
public interface TesteRepository extends GenericCrudRepository<Teste> {
	
//	public Page<TipoFrequencia> findByDescricaoFrequenciaAndPeriodicidadeAndHorarioInicial(String descricaoFrequencia, Integer periodicidade, Date date, Pageable pageable);
//
//	public Page<TipoFrequencia> findByDescricaoFrequenciaLikeIgnoreCaseAndPeriodicidadeAndHorarioInicial(String descricaoFrequencia, Integer periodicidade,
//			Date horarioInicial, Pageable pageable);
//	
//	public Page<TipoFrequencia> findByDescricaoFrequenciaAndPeriodicidade(String descricaoFrequencia, Integer periodicidade, Pageable pageable);
//
//	public Page<TipoFrequencia> findByDescricaoFrequenciaLikeIgnoreCaseAndPeriodicidade(String descricaoFrequencia, Integer periodicidade, Pageable pageable);
//	
//	public Page<TipoFrequencia> findByDescricaoFrequenciaAndHorarioInicial(String descricaoFrequencia, Date horarioInicial, Pageable pageable);
//
//	public Page<TipoFrequencia> findByDescricaoFrequenciaLikeIgnoreCaseAndHorarioInicial(String descricaoFrequencia, Date horarioInicial, Pageable pageable);
//	
//	public Page<TipoFrequencia> findByPeriodicidadeAndHorarioInicial(Integer periodicidade, Date horarioInicial, Pageable pageable);
//
//	public Page<TipoFrequencia> findByDescricaoFrequencia(String descricaoFrequencia, Pageable pageable);
//	
//	public Page<TipoFrequencia> findByDescricaoFrequenciaLikeIgnoreCase(String descricaoFrequencia, Pageable pageable);
//	
//	public Page<TipoFrequencia> findByPeriodicidade(Integer periodicidade, Pageable pageable);
//
//	public Page<TipoFrequencia> findByHorarioInicial(Date horarioInicial, Pageable pageable);
//	
//	public Page<TipoFrequencia> findAll(Pageable pageable);
	
	
	public Page<Teste> findByDescricaoLikeIgnoreCase(String descricao, Pageable pageable);
	public Page<Teste> findAll(Pageable pageable);

}
