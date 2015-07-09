package br.com.mv.geral.controleacesso.authentication.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.encoding.BaseDigestPasswordEncoder;

public class PasswordEncoderImpl extends BaseDigestPasswordEncoder {

	private static final Logger LOGGER = LoggerFactory.getLogger(PasswordEncoderImpl.class);

	@Override
	public boolean isPasswordValid(String encryptedPassword, String rawPassword, Object salt) {
		return encodePassword(rawPassword, salt).equals(encryptedPassword);
	}

	@Override
	public String encodePassword(String rawPassword, Object salt) {
		MessageDigest md5 = null;

		try {
			md5 = MessageDigest.getInstance("MD5");
		} catch (NoSuchAlgorithmException e) {
			LOGGER.error("Não foi possível criar uma instância de MD5", e);
		}

		md5.reset();
		byte[] bytes = rawPassword.toUpperCase().getBytes();
		byte[] b = md5.digest(bytes);
		StringBuilder buf = new StringBuilder();
		String hexDigits = "0123456789ABCDEF";

		for (int i = 0; i < b.length; i++) {
			int j = ((int) b[i]) & 0xFF;
			buf.append(hexDigits.charAt(j / 16));
			buf.append(hexDigits.charAt(j % 16));
		}

		if (salt != null) {
			if (salt instanceof String) { // administrador 2
				StringBuilder primeiraMetade = new StringBuilder(buf.substring(0, 16));
				StringBuilder inversao01 = new StringBuilder(primeiraMetade.substring(0, 8));
				StringBuilder inversao02 = new StringBuilder(primeiraMetade.substring(8));
				StringBuilder segundaMetade = new StringBuilder(buf.substring(16));
				StringBuilder inversao03 = new StringBuilder(segundaMetade.substring(0, 8));
				StringBuilder inversao04 = new StringBuilder(segundaMetade.substring(8));
				return inversao03.reverse().append(inversao04.reverse()).append(inversao01.reverse())
						.append(inversao02.reverse()).toString();
			} else { // administrador 1
				StringBuilder primeiraMetade = new StringBuilder(buf.substring(0, 16));
				StringBuilder segundaMetade = new StringBuilder(buf.substring(16));
				return primeiraMetade.reverse().append(segundaMetade.reverse()).toString();
			}
		}
		return buf.toString();
	}
}