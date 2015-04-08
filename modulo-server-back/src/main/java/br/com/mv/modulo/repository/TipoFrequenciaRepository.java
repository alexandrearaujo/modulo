/**
 * 
 */
package br.com.mv.modulo.repository;

import java.util.Date;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.mv.modulo.model.TipoFrequencia;

@Repository
public interface TipoFrequenciaRepository extends JpaRepository<TipoFrequencia, Long> {

	public Page<TipoFrequencia> findByDescricaoFrequenciaAndPeriodicidadeAndHorarioInicial(String descricaoFrequencia, Integer periodicidade, Date date, Pageable pageable);

	public Page<TipoFrequencia> findByDescricaoFrequenciaLikeIgnoreCaseAndPeriodicidadeAndHorarioInicial(String descricaoFrequencia, Integer periodicidade,
			Date horarioInicial, Pageable pageable);
	
	public Page<TipoFrequencia> findByDescricaoFrequenciaAndPeriodicidade(String descricaoFrequencia, Integer periodicidade, Pageable pageable);

	public Page<TipoFrequencia> findByDescricaoFrequenciaLikeIgnoreCaseAndPeriodicidade(String descricaoFrequencia, Integer periodicidade, Pageable pageable);
	
	public Page<TipoFrequencia> findByDescricaoFrequenciaAndHorarioInicial(String descricaoFrequencia, Date horarioInicial, Pageable pageable);

	public Page<TipoFrequencia> findByDescricaoFrequenciaLikeIgnoreCaseAndHorarioInicial(String descricaoFrequencia, Date horarioInicial, Pageable pageable);
	
	public Page<TipoFrequencia> findByPeriodicidadeAndHorarioInicial(Integer periodicidade, Date horarioInicial, Pageable pageable);

	public Page<TipoFrequencia> findByDescricaoFrequencia(String descricaoFrequencia, Pageable pageable);
	
	public Page<TipoFrequencia> findByDescricaoFrequenciaLikeIgnoreCase(String descricaoFrequencia, Pageable pageable);
	
	public Page<TipoFrequencia> findByPeriodicidade(Integer periodicidade, Pageable pageable);

	public Page<TipoFrequencia> findByHorarioInicial(Date horarioInicial, Pageable pageable);
	
	public Page<TipoFrequencia> findAll(Pageable pageable);
	
	@Query("select tf from TipoFrequencia tf where tf.descricaoFrequencia like %:#{#tipoFrequencia.descricaoFrequencia}% and"
			+ " tf.periodicidade = :#{#tipoFrequencia.periodicidade} and tf.horarioInicial = :#{#tipoFrequencia.horarioInicial}")
	public Page<TipoFrequencia> findWithCustomQuery(@Param("tipoFrequencia") TipoFrequencia tipoFrequencia, Pageable pageable);

	@Query("select count(tf) from TipoFrequencia tf where tf.descricaoFrequencia = :#{#tipoFrequencia.descricaoFrequencia} and tf.horarioInicial = :#{#tipoFrequencia.horarioInicial}")
	public Long checkExistsTipoFrequenciaByDescricaoAndHorarioInicial(@Param("tipoFrequencia") TipoFrequencia tipoFrequencia);
	
	public Long countByDescricaoFrequenciaAndHorarioInicial(String descricaoFrequencia, Date HorarioInicial);
	
}
