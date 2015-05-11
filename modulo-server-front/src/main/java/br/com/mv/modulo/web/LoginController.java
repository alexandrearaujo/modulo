package br.com.mv.modulo.web;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.bind.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;

import br.com.mv.geral.model.User;
import br.com.mv.modulo.business.VersaoBusiness;

@Controller
@RequestMapping("/login")
@SessionAttributes(types = User.class)
public class LoginController {

	private final VersaoBusiness versaoBusiness;
	
	
	@Autowired
	public LoginController(VersaoBusiness versaoBusiness) {
		this.versaoBusiness = versaoBusiness;
	}
	
	@RequestMapping(method = RequestMethod.GET)
	public String tologin(Model model, HttpSession session) {
		//TODO Promover o versaoBanco ao contexto de aplicação onde o mesmo será carregado apenas uma vez.
		if(session.getAttribute("versaoBanco") == null)
			session.setAttribute("versaoBanco", versaoBusiness.getVersao().getVersaoBanco());
		
		return "login";
	}
	
	@RequestMapping(value = "/selectVinculo", method = RequestMethod.GET)
	public String selectVinculo(@AuthenticationPrincipal User usuario, Model model) {
		if (usuario.getVinculoProfissionals() != null && usuario.getVinculoProfissionals().size() > 1) {
			model.addAttribute("usuario", usuario);
			return "selecaoVinculo";
		}
		
		return redirect(usuario);
	}
	
	@RequestMapping(value = "/selectedVinculo", method = RequestMethod.GET)
	public String selectedVinculo(@RequestParam(value = "id", required = true) Long id, @AuthenticationPrincipal User usuario, Model model) {
		usuario.setVinculoProfissional(usuario
				.getVinculoProfissionals()
				.stream()
				.filter(vinculoProfissional -> vinculoProfissional.getId().equals(id)).findFirst().get());
		
		return redirect(usuario);
	}
	
	private String redirect(User usuario) {
//		if (usuario.hasRole(UserRoles.MEDICO.getValue())) {
//			return "redirect:/solicitacaoMedicamento/";
//		} else if (usuario.hasRole(UserRoles.ADMIN.getValue())) {
//			return "redirect:/";
//		} else {
//			return "redirect:/dispensacaoMedicamento/list";
//		}
		
		return "redirect:/";
	}
}