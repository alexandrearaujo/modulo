package br.com.mv.modulo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories({"br.com.mv.modulo.repository"})
public class ModuloJpaConfig extends HibernateJpaAutoConfiguration {

	@Override
	protected String[] getPackagesToScan() {
		// TODO Auto-generated method stub
		// return super.getPackagesToScan();
		List<String> packages = new ArrayList<String>();
		packages.add("org.springframework.data.jpa.domain.support");
		packages.add("br.com.mv.geral.model");
		packages.add("br.com.mv.modulo.model");
//		packages.addAll(Arrays.asList(super.getPackagesToScan()));
		
		return  packages.toArray(new String[0]);
	}

}
