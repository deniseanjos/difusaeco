package com.difusaEco.DifusaEco.service;

import java.nio.charset.Charset;
import java.util.Optional;


import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.difusaEco.DifusaEco.model.UserLogin;
import com.difusaEco.DifusaEco.model.Usuario;
import com.difusaEco.DifusaEco.repository.UsuarioRepository;


@Service
public class UsuarioService {

	@Autowired
	private UsuarioRepository repository;
	
	public Optional<Usuario> CadastrarUsuario(Usuario usuario) {
		
		if(repository.findByEmail(usuario.getEmail()).isPresent())
			return null;
		
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		
		String senhaEncoder = encoder.encode(usuario.getSenha());
		usuario.setSenha(senhaEncoder);
		
		return Optional.of(repository.save(usuario));
	}
	
	public Optional<UserLogin> Logar(Optional<UserLogin> user){
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		Optional<Usuario> usuario = repository.findByEmail(user.get().getEmail());
		
		if(usuario.isPresent()) {
			if(encoder.matches(user.get().getSenha(), usuario.get().getSenha())) {
				
				String auth = user.get().getEmail() + ":" + user.get().getSenha();
				byte[]encondedAuth = Base64.encodeBase64(auth.getBytes(Charset.forName("US-ASCII")));
				String authHeader = "Basic " + new String (encondedAuth);
				
				user.get().setToken(authHeader);
				user.get().setNomeUsuario(usuario.get().getNomeUsuario());
				user.get().setId(usuario.get().getId());
				user.get().setEmail(usuario.get().getEmail());
				user.get().setSenha(usuario.get().getSenha());
				user.get().setTipoUsuario(usuario.get().getTipoUsuario());
				
				return user;	
			}
		}
		return null;
	}
	
	public Optional<Usuario> EditarUsuario (Usuario usuario){
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		
		String senhaEncoder = encoder.encode(usuario.getSenha());
		usuario.setSenha(senhaEncoder);
		
		return Optional.of(repository.save(usuario));
	}
	
	public void ApagarUsuario(Long id) {
		if (repository.findById(id).isPresent()) {
			repository.deleteById(id);
		}
	}
		
}