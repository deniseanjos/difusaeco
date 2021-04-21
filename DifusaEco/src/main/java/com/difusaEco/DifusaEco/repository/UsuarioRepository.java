package com.difusaEco.DifusaEco.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.difusaEco.DifusaEco.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
	public Optional<Usuario> findByEmail(String email);
	
	public List<Usuario> findAllByEmailContainingIgnoreCase(String email);
}
