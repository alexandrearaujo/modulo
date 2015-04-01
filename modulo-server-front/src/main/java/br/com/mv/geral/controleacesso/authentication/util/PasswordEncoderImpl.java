package br.com.mv.geral.controleacesso.authentication.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.springframework.dao.DataAccessException;
import org.springframework.security.authentication.encoding.BaseDigestPasswordEncoder;

public class PasswordEncoderImpl extends BaseDigestPasswordEncoder
{
    public boolean isPasswordValid(String encryptedPassword, String rawPassword, Object salt) throws DataAccessException {
        if (encodePassword(rawPassword, salt).equals(encryptedPassword)) {
        	return true;
        } else {
        	return false;
        }
    }

    public String encodePassword(String rawPassword, Object salt) throws DataAccessException {
        MessageDigest md5 = null;
        
        try {
            md5 = MessageDigest.getInstance("MD5");
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }

        md5.reset();
        byte[] bytes = rawPassword.toUpperCase().getBytes();
        byte[] b = md5.digest(bytes);
        StringBuffer buf = new StringBuffer();
        String hexDigits = "0123456789ABCDEF";
        
        for (int i = 0; i < b.length; i++) {
            int j = ((int) b[i]) & 0xFF;
            buf.append(hexDigits.charAt(j / 16));
            buf.append(hexDigits.charAt(j % 16));
        }

        if (salt != null) {
            if (salt instanceof String) { // administrador 2
                StringBuffer primeiraMetade = new StringBuffer(buf.substring(0, 16));
                StringBuffer inversao01 = new StringBuffer(primeiraMetade.substring(0, 8));
                StringBuffer inversao02 = new StringBuffer(primeiraMetade.substring(8));
                StringBuffer segundaMetade = new StringBuffer(buf.substring(16));
                StringBuffer inversao03 = new StringBuffer(segundaMetade.substring(0, 8));
                StringBuffer inversao04 = new StringBuffer(segundaMetade.substring(8));
                String string = inversao03.reverse().toString() + inversao04.reverse().toString() + inversao01.reverse().toString()
                        + inversao02.reverse().toString();
                return string;
            } else { // administrador 1
                StringBuffer primeiraMetade = new StringBuffer(buf.substring(0, 16));
                StringBuffer segundaMetade = new StringBuffer(buf.substring(16));
                String string = primeiraMetade.reverse().toString() + segundaMetade.reverse().toString();
                return string;
            }
        }
        return buf.toString();
    }
}