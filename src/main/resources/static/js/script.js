function getValue() {
	let txt = document.getElementById("nameBusca");
	let txtValue = txt.value;

	console.log(txtValue);
	
	if(txtValue != null && txtValue.trim() != '') {
		//document.getElementById('formCadastroUser').reset();
		limpaUserDados();
		$.ajax({
				method: 'GET',
		        url: 'buscarPorNome',
		        data: 'name=' + txtValue,
		        success: function(data) {
		            for(var i = 0; i < data.length; i++){
		            	$('#tabelaresultados > tbody').append('<tr id="'+data[i].id+'"><td>'+data[i].id+'</td><td>'+data[i].nome+'</td><td><button type="button" class="btn btn-primary" onclick="colocarEmEdicao('+data[i].id+')">Ver</td><td><button type="button" class="btn btn-danger" onclick="botaoDeletarDoModal('+data[i].id+')">Remover</td></tr>');	
		            }            
		        }
		    }).fail(function(xhr, status, errorThrown) {
				alert("Erro ao buscar usuário: " + xhr.responseText);
			});
	} else {
		limpaUserDados();
		return;		
	} 
}

//Envia uma requisição POST com as informações do Usuário
function salvarUsuario () {
	var id = $('#id').val()
	var nome = $('#nome').val()
	var idade = $('#idade').val()
	
	if(nome == null || nome != null && nome.trim() == '') {
		$('#nome').focus();
		return;
	
	} else if(idade == null || idade != null && idade.trim() == '') {
		$('#idade').focus();
		return;
	}
	
	$.ajax({
		method: "POST",
		url: "salvar",
		data: JSON.stringify({ id: id, nome: nome, idade: idade }),
		contentType: "application/json; charset=utf-8",
		success: function(response) {
			$("#id").val(response.id)
			Swal.fire({
			  position: 'top-end',
			  icon: 'success',
			  title: 'Salvo com Sucesso!',
			  showConfirmButton: false,
			  timer: 2000
			})
		}
	}).fail(function(xhr, status, errorThrown) {
		alert("Erro ao Salvar: " + xhr.responseText);
	});
}

function limpaUserDados() {
		const tableEl = document.getElementById('tabelaresultados');
		const tableBodyEl = tableEl.querySelector('tbody');
	
		while (tableBodyEl.lastElementChild) {
	  	tableBodyEl.removeChild(tableBodyEl.lastElementChild);
	}
}


function pesquisarTodos () {
	limpaUserDados();
	var nome = $('#nameBusca').val();
		
	    $.ajax({
			method: 'GET',
	        url: 'buscar',
	        success: function(data) {
	            for(var i = 0; i < data.length; i++){
					$('#tabelaresultados > tbody').append('<tr id="'+data[i].id+'"><td>'+data[i].id+'</td><td>'+data[i].nome+'</td><td><button type="button" class="btn btn-primary" onclick="colocarEmEdicao('+data[i].id+')">Ver</td><td><button type="button" class="btn btn-danger" onclick="botaoDeletarDoModal('+data[i].id+')">Remover</td></tr>');	
	            }            
	        }
	    }).fail(function(xhr, status, errorThrown) {
			alert("Erro ao buscar todos usuários: " + xhr.responseText);
		});
		
	    document.getElementById("search").reset();
	} 



function colocarEmEdicao (id) {
	$.ajax({
			method: 'GET',
	        url: 'buscarPorID',
	        data: 'iduser=' + id,
	        success: function(data) {
					$('#id').val(data.id);
					$('#nome').val(data.nome);
					$('#idade').val(data.idade); 
				
					$('#modalPesquisarUser').modal('hide');   
	        }
	    }).fail(function(xhr, status, errorThrown) {
			alert("Erro ao buscar usuário por id: " + xhr.responseText);
		});
}

function deletarUser (id) {	
	$.ajax({
			method: 'DELETE',
	        url: 'remover',
	        data: 'iduser=' + id,
	        success: function(data) {
				$('#' + id).remove();
				$("#exampleModal").modal('hide');
				document.getElementById('formCadastroUser').reset();
				
			}
						
	    }).fail(function(xhr, status, errorThrown) {
			alert("Erro ao deletar usuário por id: " + xhr.responseText);
		});
	}

function verificarCampoDeletar () {
	var nome = $('#nome').val()
	var idade = $('#idade').val()
	
	if(nome == null || nome != null && nome.trim() == '') {
		$('#nome').focus();
		return;
	
	} else if(idade == null || idade != null && idade.trim() == '') {
		$('#idade').focus();
		return;
	}
	
	botaoDeletarDaTela();	
}

function botaoDeletarDaTela () {
	var id = $('#id').val();
	
	if(id != null && id.trim() != '') {
		Swal.fire({
			title: 'Você tem certeza?',
			text: "O Usuário será removido",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sim, remover!',
			cancelButtonText: 'Cancelar'
		}).then((result) => {
			if (result.isConfirmed) {
				deletarUser(id);
				document.getElementById('formCadastroUser').reset();
		    	Swal.fire(
		      		'Deletado',
		      		'Usuário removido com sucesso!',
		      		'success'
		    	)
		  	}
		})
	} else {
		alert('Usuário Não Encontrado!');
		$("#exampleModal").modal('hide');
	}
}

function botaoDeletarDoModal (id) {	
	Swal.fire({
			title: 'Você tem certeza?',
			text: "O Usuário será removido",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sim, remover!',
			cancelButtonText: 'Cancelar'
		}).then((result) => {
			if (result.isConfirmed) {
				deletarUser(id);
				document.getElementById('formCadastroUser').reset();
		    	Swal.fire(
		      		'Deletado',
		      		'Usuário removido com sucesso!',
		      		'success'
		    	)
		  	}
		})
}