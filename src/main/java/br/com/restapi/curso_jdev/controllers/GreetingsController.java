package br.com.restapi.curso_jdev.controllers;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.restapi.curso_jdev.model.Usuario;
import br.com.restapi.curso_jdev.repository.UsuarioRepository;

/**
 *
 * A sample greetings controller to return greeting text
 */
@RestController
public class GreetingsController {
	
	@Autowired // IC/CD or CDI - Dependency of Injection
	private UsuarioRepository usuarioRepository;
	
	// Create User
	@PostMapping(value = "salvar") // Maps the URL
	@ResponseBody // Description of the response
	public ResponseEntity<Usuario> salvar (@RequestBody Usuario usuario) { // Receives used data
		Usuario user = usuarioRepository.save(usuario);
		return new ResponseEntity<Usuario>(user, HttpStatus.CREATED);
	}
	
	// Order by ID
	private Sort sortByIdAsc() {
        return new Sort(Sort.Direction.ASC, "id");
    }
	
	// Read - Search
    @GetMapping(value = "buscar")
    @ResponseBody // Return the data for response body
    public ResponseEntity<List<Usuario>> buscarUsuario () {
    	List<Usuario> usuarios = usuarioRepository.findAll(sortByIdAsc());
    	return new ResponseEntity<List<Usuario>>(usuarios, HttpStatus.OK);
    }
   
    
 	// Search by ID
  	@GetMapping(value = "buscarPorID")
  	@ResponseBody 
  	public ResponseEntity<Usuario> buscarPorID (@RequestParam(name = "iduser") Long iduser) { // Receives used data
  		Usuario usuario  = usuarioRepository.findById(iduser).get();
  		return new ResponseEntity<Usuario> (usuario, HttpStatus.OK);
  		
  	}
  	
  	// Search by Name
   	@GetMapping(value = "buscarPorNome")
   	@ResponseBody 
   	public ResponseEntity<List<Usuario>> buscarPorNome (@RequestParam(name = "name") String name) { // Receives used data
   		List<Usuario> usuario = usuarioRepository.buscarPorNome(name.trim().toUpperCase());
   		return new ResponseEntity <List<Usuario>>(usuario, HttpStatus.OK);
   	}  
    
    // Update 
 	@PutMapping(value = "atualizar") // Maps the URL
 	@ResponseBody // Description of the response
 	public ResponseEntity<?> atualizar (@RequestBody Usuario usuario) { // Receives used data
 		if (usuario.getId() == null) {
 	 		return new ResponseEntity<String>("ID Não Encontrado", HttpStatus.BAD_REQUEST );
 			
 		}
 		Usuario user = usuarioRepository.saveAndFlush(usuario);
 		return new ResponseEntity<Usuario>(user, HttpStatus.OK );
 	}
    
    // Delete
 	@DeleteMapping(value = "remover")
 	@ResponseBody 
 	public ResponseEntity<String> remover (@RequestParam Long iduser) { // Receives used data
 		usuarioRepository.deleteById(iduser);
 		return new ResponseEntity<String>("Usuário removido com sucesso", HttpStatus.OK);
 	}
}
