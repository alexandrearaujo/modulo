package br.com.mv.modulo.business;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.cas.authentication.CasAssertionAuthenticationToken;
import org.springframework.security.core.userdetails.AuthenticationUserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import lombok.extern.slf4j.Slf4j;

/**
 * Authenticate a user from the database.
 */
@Slf4j
public class CustomUserDetailsService implements AuthenticationUserDetailsService<CasAssertionAuthenticationToken> {

	private Set<String> admins;
	
	@Autowired
    private UserBusiness userBusiness;
	

	public CustomUserDetailsService() {
		super();
	}

	/**
	 * @param admins
	 */
	public CustomUserDetailsService(Set<String> admins) {
		super();
		this.admins = admins;
	}
	

//	@Override
//	public UserDetails loadUserDetails(CasAssertionAuthenticationToken token) throws UsernameNotFoundException {
//		// TODO Auto-generated method stub
//		return null;
//	}

	@Override
	public UserDetails loadUserDetails(CasAssertionAuthenticationToken token) throws UsernameNotFoundException {
		String login = token.getPrincipal().toString();
//		String lowercaseLogin = login.toLowerCase();
		
//		new UserDetailsService() {
//            @Override
//            public UserDetails loadUserByUsername(final String username) {
//            }
//        };
//
        return userBusiness.findByLogin(login);
        
//		log.debug("Authenticating '{}'", login);
//		List<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>();

//		if (admins != null && admins.contains(lowercaseLogin)) {
//			grantedAuthorities.add(new SimpleGrantedAuthority(AuthoritiesConstants.ADMIN));
//		} else {
//			grantedAuthorities.add(new GrantedAuthority() {
//				private static final long serialVersionUID = 1L;
//
//				@Override
//				public String getAuthority() {
//					return AuthoritiesConstants.USER;
//				}
//			});
		}

//		return new UserDetails(lowercaseLogin, grantedAuthorities);
//	}
}
