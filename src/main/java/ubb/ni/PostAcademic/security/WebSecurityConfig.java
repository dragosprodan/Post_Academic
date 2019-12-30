package ubb.ni.PostAcademic.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.sql.DataSource;


@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	DataSource dataSource;


	@Override
   protected void configure(HttpSecurity http) throws Exception {
	  http
	  	.csrf().disable()
      	.authorizeRequests()
			  .antMatchers("/api/authority").permitAll()
			  .anyRequest().permitAll()
			  .and()
        .formLogin()
        	.permitAll()
			  .loginPage("/login")
			  .loginProcessingUrl("/api/login")
			  .defaultSuccessUrl("/home")
			  .and()
      	.logout()
				.permitAll()
				.logoutUrl("/api/logout")
				.logoutSuccessUrl("/login")
				.deleteCookies("JSESSIONID");

   }
   	
	@Autowired
	public void configAuthentication(AuthenticationManagerBuilder auth) throws Exception {
		
	  auth.jdbcAuthentication()
	  	.passwordEncoder(new BCryptPasswordEncoder())
	  	.dataSource(dataSource)
		.usersByUsernameQuery(
			"select username, password, 1 as enabled from users where username=?")
		.authoritiesByUsernameQuery(
			"select username, account_type as authority from users where username=?");
	}

	
}