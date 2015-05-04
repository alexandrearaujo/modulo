package br.com.mv.modulo.business;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.mv.modulo.exception.GenericException;
import br.com.mv.modulo.repository.GenericCrudRepository;

@Service
public abstract class GenericCrudBusiness<T> {
	
	private final GenericCrudRepository<T> genericCrudRepository;

	@Autowired
	public GenericCrudBusiness(GenericCrudRepository<T> genericCrudRepository) {
		this.genericCrudRepository = genericCrudRepository;
	}
	
	@Transactional
	public void delete(Long id) {
		genericCrudRepository.delete(id);
	}
	
	@Transactional
	public void save(T t) throws GenericException {
		genericCrudRepository.save(t);
 	}
	
	public abstract Page<T> listModel(T t, Pageable pageable);
}