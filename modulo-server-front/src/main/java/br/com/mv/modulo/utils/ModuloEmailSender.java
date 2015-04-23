package br.com.mv.modulo.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Component;

@Component
public class ModuloEmailSender {
	
	private final MailSender mailSender;
	
	@Autowired
	public ModuloEmailSender(MailSender mailSender) {
		this.mailSender = mailSender;
	}
	
//	  @Value("${mail.protocol}")
//    private String protocol;
//    @Value("${mail.host}")
//    private String host;
//    @Value("${mail.port}")
//    private int port;
//    @Value("${mail.smtp.auth}")
//    private boolean auth;
//    @Value("${mail.smtp.starttls.enable}")
//    private boolean starttls;
//    @Value("${mail.from}")
//    private String from;
//    @Value("${mail.username}")
//    private String username;
//    @Value("${mail.password}")
//    private String password;
	
	
	public void sendEmail(String content) {
		SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo("suporte@mv.com.br");
        mailMessage.setFrom("dispensacao@mv.com.br");
        mailMessage.setSubject("Erro no sistema Dispensação de medicamento!");
        mailMessage.setText(content);
        
        try {
        	mailSender.send(mailMessage);
        } catch (MailException ex) {
        	System.err.println(ex.getMessage());
        }
	}
	
	public void sendException(Exception exception) {
		StringBuilder str = new StringBuilder();
		str.append("Erro: " + exception.toString() + System.lineSeparator());
		str.append("Mensagem: " + exception.getLocalizedMessage() + System.lineSeparator());
		str.append("Stack: " + System.lineSeparator());
        for (StackTraceElement element : exception.getStackTrace()) {
        	str.append(element.toString() + System.lineSeparator());
        }
        
        sendEmail(str.toString());
	}

}
