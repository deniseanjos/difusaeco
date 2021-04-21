package com.difusaEco.DifusaEco.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.difusaEco.DifusaEco.model.UserLogin;
import com.difusaEco.DifusaEco.model.Usuario;
import com.difusaEco.DifusaEco.repository.UsuarioRepository;
import com.difusaEco.DifusaEco.service.UsuarioService;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UsuarioController {

	@Autowired
	private UsuarioService usuarioService;

	@Autowired
	private UsuarioRepository usuarioRepository;

	@PostMapping("/logar")
	public ResponseEntity<UserLogin> Autentication(@RequestBody Optional<UserLogin> user) {
		return usuarioService.Logar(user).map(resp -> ResponseEntity.ok(resp))
				.orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
	}

	@PostMapping("/cadastrar")
	public ResponseEntity<Usuario> Post(@RequestBody Usuario usuario) {
		Optional<Usuario> user = usuarioService.CadastrarUsuario(usuario);
		try {
			return ResponseEntity.ok(user.get());
		} catch (Exception e) {

			return ResponseEntity.badRequest().build();
		}
	}
	
	@PutMapping
	public ResponseEntity<Usuario> Put(@RequestBody Usuario usuario){
		Optional<Usuario> user = usuarioService.EditarUsuario(usuario);
		try {
			return ResponseEntity.ok(user.get());
		} catch (Exception e) {

			return ResponseEntity.badRequest().build();
		}
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable long id) {
		usuarioService.ApagarUsuario(id);
	}
	
	@GetMapping
	public ResponseEntity<List<Usuario>> getAll() {
		return ResponseEntity.ok(usuarioRepository.findAll());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Usuario> getByIdUsuario(@PathVariable long id){
		return usuarioRepository.findById(id).map(resp -> ResponseEntity.ok(resp)).orElse(ResponseEntity.notFound().build());
	}
	
	@GetMapping("/usuarios/{email}")
	public ResponseEntity<List<Usuario>> getByEmail(@PathVariable String email){
		return ResponseEntity.ok(usuarioRepository.findAllByEmailContainingIgnoreCase(email));
	}
	
}