function onload(){
	if($('#devolucaoId').val() != ''){
		fncHabilitaCampoCidadao(false);
	}
}

function popupCidadaoSimplificado(){
	var devolucaoMedicamento = $("#devolucaoMedicamentoForm").inputsToJSON();
	var cidadao = devolucaoMedicamento.cidadaoPaciente;
	$('#listagemCidadaoModal').modal('show');
	$.ajax({
		url:'/dispensacao/cidadaoSimplificado/listCidadao', 
		type: "POST",
		data: JSON.stringify(cidadao), 
		dataType: "html",
		contentType: "application/json",
		success: function(response){
			$('#cidadaoSimplificado').html(response);
		}
	});  
}

function validaCidadaoSexo() {
	if ($('#nomeCidadao').val().length > 0){	
		if($('#sexo').val() != 0){ 	
			$('#modalPesquisarCidadao').prop("disabled", false);
		} else
			$('#modalPesquisarCidadao').prop("disabled", true);
	} else{
		$('#modalPesquisarCidadao').prop("disabled", true);
	}
}

function fncSelecionaCidadao(cidadao){
	var cidadaoPaciente = $("#devolucaoMedicamentoForm").inputsToJSON().cidadaoPaciente;
	cidadaoPaciente.id = cidadao;
	
	$.ajax({
		url: '/dispensacao/devolucaoMedicamento/selecionarCidadao', 
		type: "POST",
		data: JSON.stringify(cidadaoPaciente),
		contentType: "application/json",
		success: function(cidadao) {
			fncPopulaCampoCidadao(cidadao);
			$("#cidadaoPacienteId").val(cidadao.id);
			$("#btnIncluirMedicamentoItemUnidade").prop("disabled", false);
			$("#btnSalvar").prop("disabled", false);
			$('#listagemCidadaoModal').modal('hide');
			fncHabilitaCampoCidadao(false);
			var idCidadao = cidadao.id;
		}
	}).fail(function(v){
		alert(v.responseText);
	});
}

function fncPopulaCampoCidadao(cidadao){
	$('#nomeCidadao').val(cidadao.nome);
	$('#cpf').val(fncFormataCpf(cidadao.cpf));
	$('#nascimento').val(fncFormataData(cidadao.nascimento));
	$('#nomeMae').val(cidadao.nomeMae);
	$('#sexo>option:eq('+cidadao.sexo+')').attr('selected', true)
}

function fncHabilitaCampoCidadao(flag){
	$("#nomeCidadao").prop("disabled", !flag);
	$("#cpf").prop("disabled", !flag);
	$("#nascimento").prop("disabled", !flag);
	$("#iconeNascimento").attr("disabled", !flag);
	$("#nomeMae").prop("disabled", !flag);
	$("#sexo").prop("disabled", !flag);
}



function fncListarUnidades() {
	var url = '/dispensacao/devolucaoMedicamento/listUnidades/'+ $('#medicamento').val();
	fncPopulaCombo(url, '#medicamentoItemUnidade');
}

var filtrarMedicamento = function (medicamento) {
	return {
		value: medicamento.descricao,
		id: medicamento.id
	}
}

function fncAdicionarMedicamento(){
	var devolucaoMedicamentoForm = $("#devolucaoMedicamentoForm");
	
	fncHabilitaValidacaoMedicamento(devolucaoMedicamentoForm, true);
	fncValidaCamposMedicamento(devolucaoMedicamentoForm);
	
	var isValid = devolucaoMedicamentoForm.data('bootstrapValidator').getInvalidFields().length == 0 ? true : false;
	
	if(isValid) {
		var devolucaoMedicamento = devolucaoMedicamentoForm.inputsToJSON();
		$.ajax({
			url: '/dispensacao/devolucaoMedicamento/addMedicamentoItemUnidade', 
			type: "POST",
			data: JSON.stringify(devolucaoMedicamento),
			contentType: "application/json",
			success: function(response) {
				$('#itensDevolucaoMedicamentoTable').html(response);
				$('#bootstrapTable').bootstrapTable();
				fncLimpaCamposMedicamento();
				fncHabilitaValidacaoMedicamento(devolucaoMedicamentoForm, false)
				fncValidaCamposMedicamento(devolucaoMedicamentoForm);
			}
		}).fail(
				function( jqXHR) {
					$.messageError(jqXHR);
				});
	}
}

function fncHabilitaValidacaoMedicamento(devolucaoMedicamentoForm, flag){
	devolucaoMedicamentoForm.bootstrapValidator('enableFieldValidators','quantidadeMedicamento', flag);
	devolucaoMedicamentoForm.bootstrapValidator('enableFieldValidators','medicamentoItemUnidade.id', flag);
}

function fncValidaCamposMedicamento(devolucaoMedicamentoForm){
	devolucaoMedicamentoForm.bootstrapValidator('revalidateField','quantidadeMedicamento');
	devolucaoMedicamentoForm.bootstrapValidator('revalidateField','medicamentoItemUnidade.id');
}

function fncLimpaCamposMedicamento(){
	$("#quantidadeMedicamento").val('');
	$("#medicamentoItemUnidade").find('option').remove().end();
	$("#chrMedicamento").val('');
	$("#medicamento").val('');
	$('#chrMedicamento').typeahead('val','');
}

function removeItemMedicamento(idItemMedicamento){
	$.get('/dispensacao/devolucaoMedicamento/removeItemMedicamento', 
		{idItemMedicamento : idItemMedicamento},	
		function(html) {
			$('#itensDevolucaoMedicamentoTable').html(html);
			$('#bootstrapTable').bootstrapTable();
		}
	);
}