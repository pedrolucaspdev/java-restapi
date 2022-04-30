package br.com.restapi.curso_jdev.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.com.restapi.curso_jdev.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
	
	@Query(value = "select u from Usuario u where upper(trim(u.nome)) like %?1% order by u.id")
	List<Usuario> buscarPorNome(String name);
}
