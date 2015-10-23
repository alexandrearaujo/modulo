package br.com.mv.modulo.web;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.ModelAndView;

import br.com.mv.modulo.exception.ExceptionInfo;
import br.com.mv.modulo.exception.GenericException;
import br.com.mv.modulo.model.type.EnumTipoMensagem;
import br.com.mv.modulo.utils.AjaxUtils;
import br.com.mv.modulo.utils.ModuloEmailSender;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@ControllerAdvice
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Slf4j
public class ExceptionController {
	
	private Exception exception;
	
	private final ModuloEmailSender moduloMailSender;
	
	private static final String EXCEPTION = "exception";
	
	
	@ExceptionHandler(Exception.class)
	@RequestMapping("/exception")
    public ModelAndView handleException(HttpServletRequest req, Exception e) throws GenericException {
		log.error("Exceção capturada:", e);
		e.printStackTrace();
		
		req.setAttribute("javax.servlet.error.status_code",	HttpStatus.INTERNAL_SERVER_ERROR.value());
		
		if (AnnotationUtils.findAnnotation(e.getClass(), ResponseStatus.class) != null || AjaxUtils.isAjaxRequest(req)) {
			throw new GenericException(e);
		}
		
        ModelAndView mav = new ModelAndView(EXCEPTION);
        mav.addObject(EXCEPTION, e);
        exception = e;
        
        mav.addObject("timestamp", new Date());
        mav.addObject("url", req.getRequestURL());
        mav.addObject("status", 500);
        return mav;
    }
	
	@ExceptionHandler(GenericException.class)
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	@ResponseBody ExceptionInfo handleBadRequest(HttpServletRequest req, Exception ex) {
	    return new ExceptionInfo(req.getRequestURL(), new GenericException(ex));
	} 
	
	@RequestMapping(value = "/sendException")
	public String sendException(Model model) {
		moduloMailSender.sendException(exception);
		model.addAttribute(EXCEPTION, exception);
		model.addAttribute("timestamp", new Date());
		model.addAttribute("status", 500);
		model.addAttribute("success", "Enviado com sucesso");
		return EXCEPTION;
	}
}
