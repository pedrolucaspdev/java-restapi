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
			alert("Salvo com Sucesso!");
		}
	}).fail(function(xhr, status, errorThrown) {
		alert("Erro ao Salvar: " + xhr.responseText);
	});
}

function limpaUserDados() {
		const tableEl = document.getElementById('tabelaresultados');
		const tableBodyEl = tableEl.querySelector('tbody');
	
		// or, directly get the <tbody> element if its id is known
		// const tableBodyEl = document.getElementById('table-rows');
	
		while (tableBodyEl.lastElementChild) {
	  	tableBodyEl.removeChild(tableBodyEl.lastElementChild);
	}
}


function pesquisarUser () {	
	limpaUserDados();
	
	var nome = $('#nameBusca').val();

	if(nome != null && nome.trim() != '') {
		document.getElementById('formCadastroUser').reset();
	    $.ajax({
			method: 'GET',
	        url: 'buscarPorNome',
	        data: 'name=' + nome,
	        success: function(data) {
	            for(var i = 0; i < data.length; i++){
	            	$('#tabelaresultados > tbody').append('<tr id="'+data[i].id+'"><td>'+data[i].id+'</td><td>'+data[i].nome+'</td><td><button type="button" class="btn btn-primary" onclick="colocarEmEdicao('+data[i].id+')">Ver</td><td><button type="button" class="btn btn-danger" onclick="deletarUser('+data[i].id+')">Remover</td></tr>');	
	            }            
	        }
	    }).fail(function(xhr, status, errorThrown) {
			alert("Erro ao buscar usuário: " + xhr.responseText);
		});
	} 
}

function pesquisarTodos () {
	limpaUserDados();
	var nome = $('#nameBusca').val();

	if(nome != null && nome.trim() != '') {
		
	    $.ajax({
			method: 'GET',
	        url: 'buscar',
	        success: function(data) {
	            for(var i = 0; i < data.length; i++){
	            	$('#tabelaresultados > tbody').append('<tr id="'+data[i].id+'"><td>'+data[i].id+'</td><td>'+data[i].nome+'</td><td><button type="button" class="btn btn-primary" onclick="colocarEmEdicao('+data[i].id+')">Ver</td><td><button type="button" class="btn btn-danger" onclick="deletarUser('+data[i].id+')">Remover</td></tr>');	
	            }            
	        }
	    }).fail(function(xhr, status, errorThrown) {
			alert("Erro ao buscar todos usuários: " + xhr.responseText);
		});
	} 
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
	if(confirm('Deseja realmente deletar este Usuário?')){
	
	$.ajax({
			method: 'DELETE',
	        url: 'remover',
	        data: 'iduser=' + id,
	        success: function(data) {
				$('#' + id).remove();
				alert(data);
				document.getElementById('formCadastroUser').reset();
	        }
	    }).fail(function(xhr, status, errorThrown) {
			alert("Erro ao deletar usuário por id: " + xhr.responseText);
		});
	}
}


function botaoDeletarDaTela () {
	var id = $('#id').val();
	
	if(id != null && id.trim() != '') {
		deletarUser(id);
		document.getElementById('formCadastroUser').reset();
		
	}
}

