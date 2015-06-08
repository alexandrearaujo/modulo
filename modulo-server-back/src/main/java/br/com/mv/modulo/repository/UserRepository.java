package br.com.mv.modulo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.mv.geral.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	public User findByLoginIgnoringCase(String login);

}
