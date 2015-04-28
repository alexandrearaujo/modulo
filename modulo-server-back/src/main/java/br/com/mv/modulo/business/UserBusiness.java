package br.com.mv.modulo.business;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.mv.geral.model.User;
import br.com.mv.geral.model.VinculoProfissionalSigas;
import br.com.mv.modulo.repository.UserRepository;

@Service
@Transactional(readOnly = true)
public class UserBusiness {
	
	@Autowired
	UserRepository userRepository;
	
	public User findByLogin(String login) {
		User user = userRepository.findByLogin(login);
		Hibernate.initialize(user.getCidadao());
		Hibernate.initialize(user.getCidadao().getProfissionalSigas().getVinculoProfissionals());
		for (VinculoProfissionalSigas vinculoProfissionalSigas : user.getCidadao().getProfissionalSigas().getVinculoProfissionals()) {
			Hibernate.initialize(vinculoProfissionalSigas.getEstabelecimento());
		}
		return user;
	}

}
