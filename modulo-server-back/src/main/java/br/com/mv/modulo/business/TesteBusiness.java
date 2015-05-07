package br.com.mv.modulo.business;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.mv.modulo.model.Teste;
import br.com.mv.modulo.repository.TesteRepository;

@Service
@Transactional(readOnly=true)
public class TesteBusiness extends GenericCrudBusiness<Teste> {
	
	private final TesteRepository testeRepository;
	
	@Autowired
	public TesteBusiness(TesteRepository testeRepository) {
		super(testeRepository);
		this.testeRepository = testeRepository;
	}

	@Override
	public Page<Teste> listModel(Teste t, Pageable pageable) {
		String descricaoLiked = null;
		
		if (StringUtils.isNotBlank(t.getDescricao())) {
			descricaoLiked = "%" + t.getDescricao() + "%";
		}
		
		if (StringUtils.isNotBlank(t.getDescricao())) {
			return testeRepository.findByDescricaoLikeIgnoreCase(descricaoLiked, pageable);
		} else {
			return testeRepository.findAll(pageable);
		}
	}
}
