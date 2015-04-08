function excluirSolicitacaoMedicamento(button, id) {
	var url = '/dispensacao/solicitacaoMedicamento/delete?id=' + id;
	var args = arguments;	
	$.ajax({
		url: url,
		async: false,
		success: function(result) {
			jQuery.noticeAdd({
				text : result.mensagem,
				stay : false,
				type : result.tipoMensagem
			});
			
			if (result.status)
				{
					var quantidade_linhas = $('tbody#tbody_list tr').length;
					
					if (quantidade_linhas > 1)
					{
						$(button).parent().parent().remove();
					}
					else
					{
						$("#btnPesquisar").click();
					}
				}
		}
	});
	
}


function convertDate(data) {
	var dd = data.getDate();
    var mm = data.getMonth()+1;

    var yyyy = data.getFullYear();
    if(dd < 10){
        dd='0'+dd
    } 
    if(mm < 10){
        mm='0'+mm
    } 
    data = dd+'/'+mm+'/'+yyyy;
    return data;
}

function fncSelecionaCidadao(cidadao){
	
	var cidadaoPaciente = $("#solicitacaoMedicamentoForm").inputsToJSON().solicitacaoMedicamento.cidadaoPaciente;
	cidadaoPaciente.id = cidadao;
	
	$.ajax({
		url: '/dispensacao/solicitacaoMedicamento/selecionarCidadao', 
		type: "POST",
		data: JSON.stringify(cidadaoPaciente),
		contentType: "application/json",
		success: function(cidadao) {
			fncPopulaCampoCidadao(cidadao);
			$("#cidadaoPacienteId").val(cidadao.id);
			$("#btnAdicionarMedicamento").prop("disabled", false);
			$("#modalFrequencia").prop("disabled", false);
			$("#modalEntregaPaciente").prop("disabled", false);
			$("#btnSalvar").prop("disabled", false);
			$('#listagemCidadaoModal').modal('hide');
			fncHabilitaCampoCidadao(false);
			var idCidadao = cidadao.id;
			if(cidadao.cidadaoRegistroHc != null){
				$("#registroHC").val(cidadao.cidadaoRegistroHc.descricao);
				$('#registroHC').attr("data-original-title", cidadao.cidadaoRegistroHc.descricao);
			}else{
				$("#registroHC").val();
			}
			
//			$.ajax({
//				url: '/dispensacao/solicitacaoMedicamento/getRegistroCidadaoHc', 
//				type: "POST",
//				data: JSON.stringify(idCidadao),
//				contentType: "application/json",
//				success: function(cidadaoRegistroHc) {
//					if(cidadaoRegistroHc.id != null)
//				},
//			});
		},
		
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

var filtrarEstabelecimento = function (object) {
	console.log(object);
	return {
		value : object.estabelecimento.nomeFantasia,
		id : object.farmacia.id,
		idEstabelecimento: object.estabelecimento.id,
	}
}

var filtrarProfissional = function (object) {
	return {
		value: object.profissionalSigas.cidadao.nome,
		id: object.id,
	}
}

var filtrarMedicamento = function (object) {
	if(object.procedimentoVigente != null){
		return {
			value: object.descricao,
			id: object.id,
			procedimentoVigente:{id: object.procedimentoVigente.id}
		}
	}else{
		return {
			value: object.descricao,
			id: object.id
		}
	}
}

function fncPopulaUfCrm(){
	
	var profissional = new Object();
	profissional.id = $('#profissional').val();
	
	if(profissional.id != ''){
		$.ajax({
			url: '/dispensacao/solicitacaoMedicamento/setUfCrm',
			type: 'POST',
			data: JSON.stringify(profissional),
			contentType: "application/json",
			success: function(vinculoProfissional) {
				$('#crm').val(vinculoProfissional.registroConselho);
				if(vinculoProfissional.uf)
					$('#ufProfissional').val(vinculoProfissional.uf.descricaoUfSucinta);
				else
					$('#ufProfissional').val('');
			},
			
		})
	}
}

function fncPopulaDoseDiaria(){
	var medicamento = new Object();
	medicamento.id = $('#medicamento').val();
	
	$.ajax({
		url: '/dispensacao/solicitacaoMedicamento/getMedicamento',
		type: 'POST',
		data: JSON.stringify(medicamento),
		contentType: "application/json",
		success: function(result) {
			$('#quantidadeDose').val(result.numeroDoseDiariaDefinida);
			fncListarUnidades();
		},
	})
}

function fncListarUnidades() {
	var url = '/dispensacao/solicitacaoMedicamento/listUnidades/'+ $('#medicamento').val()
	fncPopulaCombo(url, '#medicamentoItemUnidade');
}

function popupFrequencia(){
	$('#tipoFrequenciaModal').modal('show');
}

function fncListFrequencia(){
	var tipoFrequencia = new Object();
	tipoFrequencia.descricaoFrequencia = $('#descFrequencia').val();
	
	$.ajax({
		url: '/dispensacao/solicitacaoMedicamento/listFrequencia',
		type: 'POST',
		data: JSON.stringify(tipoFrequencia),
		contentType: "application/json",
		success: function(response) {
			$('#tipoFrequenciaList').html(response);
		},
	})
}

function fncSelecionaTipoFrequencia(id){
	
	var tipoFrequencia = new Object();
	tipoFrequencia.id = id;
	
	$.ajax({
		url: '/dispensacao/solicitacaoMedicamento/selecionarTipoFrequencia', 
		type: "POST",
		data: JSON.stringify(tipoFrequencia),
		contentType: "application/json",
		success: function(tipoFrequencia) {
			$("#descricaoFrequencia").val(tipoFrequencia.descricaoFrequencia);
			$("#idFrenquencia").val(tipoFrequencia.id);
			$('#tipoFrequenciaModal').modal('hide');
			$("#gridTipoFrequencia td").remove();
		},
		
	}).fail(function(v){
		alert(v.responseText);
	});
}

function fncHabilitaDuracaoPeriodicidade(flag){
	$("#quantidadePeriodoTratamento").val('');
	$("#tipoPeriodoTratamento").val("null");
	$('#solicitacaoMedicamentoForm').bootstrapValidator('enableFieldValidators','quantidadePeriodoTratamento', !flag);
	$('#solicitacaoMedicamentoForm').bootstrapValidator('enableFieldValidators','tipoPeriodoTratamento', !flag);
	$('#solicitacaoMedicamentoForm').bootstrapValidator('revalidateField','quantidadePeriodoTratamento');
	$('#solicitacaoMedicamentoForm').bootstrapValidator('revalidateField','tipoPeriodoTratamento');
	$("#quantidadePeriodoTratamento").prop("disabled", flag);
	$("#tipoPeriodoTratamento").prop("disabled", flag);
}

function fncAdicionarMedicamento(){
	var itemSolicitacaoMedicamento = $("#solicitacaoMedicamentoForm").inputsToJSON();
	
	itemSolicitacaoMedicamento.itemSolicitacaoMedicamentoApac.procedimentoCidPrincipal.id = $("#procedimentoCidPrincipal").val();
	if($("#procedimentoCidSecundario").val() != '')
		itemSolicitacaoMedicamento.itemSolicitacaoMedicamentoApac.procedimentoCidSecundario.id = $("#procedimentoCidSecundario").val();
	
	$.ajax({
		url: '/dispensacao/solicitacaoMedicamento/addMedicamento', 
		type: "POST",
		data: JSON.stringify(itemSolicitacaoMedicamento),
		contentType: "application/json",
		success: function(response) {
			$('#grdMedicamento').html(response);
			fncLimpaCamposMedicamento();
			fncHabilitaValidacaoMedicamento(false)
			fncValidaCamposMedicamento();
		},
	}).fail(
	   function( jqXHR) {
		   $.messageError(jqXHR);
	});
}

function fncValidaCamposReceituario(){
	$('#solicitacaoMedicamentoForm').bootstrapValidator('revalidateField','solicitacaoMedicamento.cidadaoPaciente.nome');
	$('#solicitacaoMedicamentoForm').bootstrapValidator('revalidateField','solicitacaoMedicamento.codigoReceita');
	$('#solicitacaoMedicamentoForm').bootstrapValidator('revalidateField','solicitacaoMedicamento.dataPrescricao');
	$('#solicitacaoMedicamentoForm').bootstrapValidator('revalidateField','solicitacaoMedicamento.cidadaoPaciente.sexo');
	$('#solicitacaoMedicamentoForm').bootstrapValidator('revalidateField','solicitacaoMedicamento.vinculoProfissional.estabelecimento.id');
	$('#solicitacaoMedicamentoForm').bootstrapValidator('revalidateField','solicitacaoMedicamento.vinculoProfissional.id');
}

function fncValidaCamposMedicamento(){
	$('#solicitacaoMedicamentoForm').bootstrapValidator('revalidateField','quantidadePeriodoTratamento');
	$('#solicitacaoMedicamentoForm').bootstrapValidator('revalidateField','quantidadeDose');
	$('#solicitacaoMedicamentoForm').bootstrapValidator('revalidateField','medicamentoItemUnidade.id');
	$('#solicitacaoMedicamentoForm').bootstrapValidator('revalidateField','tipoPeriodoTratamento');
	$('#solicitacaoMedicamentoForm').bootstrapValidator('revalidateField','viaAdministracaoMedicamento.id');
	$('#solicitacaoMedicamentoForm').bootstrapValidator('revalidateField','tipoFrequencia.descricaoFrequencia');
}

function fncHabilitaValidacaoMedicamento(flag){
	$('#solicitacaoMedicamentoForm').bootstrapValidator('enableFieldValidators','quantidadePeriodoTratamento', flag);
	$('#solicitacaoMedicamentoForm').bootstrapValidator('enableFieldValidators','quantidadeDose', flag);
	$('#solicitacaoMedicamentoForm').bootstrapValidator('enableFieldValidators','medicamentoItemUnidade.id', flag);
	$('#solicitacaoMedicamentoForm').bootstrapValidator('enableFieldValidators','tipoPeriodoTratamento', flag);
	$('#solicitacaoMedicamentoForm').bootstrapValidator('enableFieldValidators','viaAdministracaoMedicamento.id', flag);
	$('#solicitacaoMedicamentoForm').bootstrapValidator('enableFieldValidators','tipoFrequencia.descricaoFrequencia', flag);
}

function fncHabilitaValidacaoReceituario(flag){
	$('#solicitacaoMedicamentoForm').bootstrapValidator('enableFieldValidators','solicitacaoMedicamento.codigoReceita', flag);
	$('#solicitacaoMedicamentoForm').bootstrapValidator('enableFieldValidators','solicitacaoMedicamento.dataPrescricao', flag);
	$('#solicitacaoMedicamentoForm').bootstrapValidator('enableFieldValidators','solicitacaoMedicamento.vinculoProfissional.registroConselho', flag);
	$('#solicitacaoMedicamentoForm').bootstrapValidator('enableFieldValidators','solicitacaoMedicamento.vinculoProfissional.estabelecimento.id', flag);
	$('#solicitacaoMedicamentoForm').bootstrapValidator('enableFieldValidators','solicitacaoMedicamento.vinculoProfissional.id', flag);
}

function fncHabilitaValidacaoCidadao(flag){
	$('#solicitacaoMedicamentoForm').bootstrapValidator('enableFieldValidators','solicitacaoMedicamento.cidadaoPaciente.nome', flag);
	$('#solicitacaoMedicamentoForm').bootstrapValidator('enableFieldValidators','solicitacaoMedicamento.cidadaoPaciente.sexo', flag);
}

function fncLimpaCamposMedicamento(){
	$("#quantidadePeriodoTratamento").val('');
	$("#quantidadeDose").val('');
	$("#medicamentoItemUnidade").find('option').remove().end();
	$("#descricaoFrequencia").val('');
	$("#chrMedicamento").val('');
	$("#medicamento").val('');
	$('#chrMedicamento').typeahead('val','');
	$("#orientacao").val('');
	$("#tipoPeriodoTratamento").val("null");
	$("#viaAdministracao").val("null");
	$('#usoContinuo2').iCheck('uncheck');
	fncHabilitaDuracaoPeriodicidade(false)
}

function fncSalvarSolicitacao(){
	fncHabilitaValidacaoReceituario(true);
	fncValidaCamposReceituario();
	fncHabilitaValidacaoMedicamento(false);
	fncValidaCamposMedicamento();
	
	var isValid  = $('#solicitacaoMedicamentoForm').data('bootstrapValidator').getInvalidFields().length == 0 ? true : false;
	
	if(isValid){
		var solicitacaoMedicamento = $("#solicitacaoMedicamentoForm").inputsToJSON()
	
		$.ajax({
			url: '/dispensacao/solicitacaoMedicamento/save', 
			type: "POST",
			data: JSON.stringify(solicitacaoMedicamento),
			contentType: "application/json",
			async: false,
			success: function(result) {
				top.location.href="returnToList";
			},
		}).fail(
	       function( jqXHR) {
	        var response = $.parseJSON(jqXHR.responseText);
	        $.growl({
				message: response.ex,
				url: response.url,
			},{
				delay: 4000,
				type: response.messageType
			});
	    });
	}
}

function fncRemoverMedicamento(id){
	
	var itemSolicitacaoMedicamento = new Object();
	itemSolicitacaoMedicamento.medicamentoItemUnidade = new Object();
	itemSolicitacaoMedicamento.medicamentoItemUnidade.id = id;
	
	$.ajax({
		url: '/dispensacao/solicitacaoMedicamento/removeMedicamento', 
		type: "POST",
		data: JSON.stringify(itemSolicitacaoMedicamento),
		contentType: "application/json",
		success: function(response) {
		},
	}).done(function(response){
		$('#grdMedicamento').html(response);
		
		$.ajax({
			url: '/dispensacao/solicitacaoMedicamento/bloqueiaCidPrincipal', 
			type: "POST",
			success: function(result) {
				if(!result){
					$('#cid').val('');
					$('#chrCidPrincipal').prop("disabled", false);
				}
			},
		});
	});
	
}

function onload(){
	ajaxSetup();
	if($('#solicitacaoId').val() != ''){
		
		$('#btnImprimirReceituario').removeAttr("class");
		$('#lnkImprimirReceituario').attr("target", "_blank");
		$('#lnkImprimirReceituario').attr("href", "../relatorios/imprimirReceituario?idSolicitacaoMedicamento="+$('#solicitacaoId').val());
		if($("#solicitacaoApacId").val() != ''){
			$('#btnImprimirLME').removeAttr("class");
			$('#lnkImprimirLME').attr("target", "_blank");
			$('#lnkImprimirLME').attr("href", "../relatorios/imprimirLaudoLME?idSolicitacaoMedicamento="+$("#solicitacaoId").val());
		}
		if($('#situacaoId').val() != '1'){
			fncHabilitaCampoCidadao(false);
			fncHabilitaCamposEnderecoEntrega(false);
			$('#modalPesquisarCidadao').prop("disabled", true);
			$('#codigoReceita').prop("disabled", true);
			$('#dataPrescricao').prop("disabled", true);
			$('#dataProximaConsulta').prop("disabled", true);
			$('#chrProfissional').prop("disabled", true);
			$('#chrEstabelecimento').prop("disabled", true);
			if($('#situacaoId').val() == '1'){
				$('#modalFrequencia').prop("disabled", false);
				$('#btnAdicionarMedicamento').prop("disabled", false);
			}else{
				$('#modalFrequencia').prop("disabled", true);
				$('#btnAdicionarMedicamento').prop("disabled", true);
			}
			$('#btnLimpar').prop("disabled", true);
			$('#btnSalvar').prop("disabled", true);
			$('#btnLimparSolicitacao').prop("disabled", true);
			$('#modalPesquisarCidadao').prop("disabled", true);
			$("#iconeDataProximaConsulta").attr("disabled","true");
			$("#iconeDataPrescricao").attr("disabled","true");
		}else{
			$('#modalFrequencia').prop("disabled", false);
			$('#btnAdicionarMedicamento').prop("disabled", false);
		}
		fncPopulaUfCrm();
	}
	if(top.location.href.indexOf("save")>-1){
		$('#btnAdicionarMedicamento').prop("disabled", false);
		$('#modalFrequencia').prop("disabled", false);
	}
}

function fncVerificaProcedimentoApac(){
	fncHabilitaValidacaoReceituario(false);
	fncHabilitaValidacaoCidadao(false);
	fncHabilitaValidacaoMedicamento(true);
	fncValidaCamposMedicamento();
	
	var isValid  = $('#solicitacaoMedicamentoForm').data('bootstrapValidator').getInvalidFields().length == 0 ? true : false;
	
	if(isValid){
	
		var itemSolicitacaoMedicamento = $("#solicitacaoMedicamentoForm").inputsToJSON();
		var solicitacaoMedicamentoApac = $("#solicitacaoMedicamentoForm").inputsToJSON();
		if($("#solicitacaoMedicamentoForm").inputsToJSON().solicitacaoMedicamento.pmc == 'TRUE')
			$("#pmc").val(true);
			
		itemSolicitacaoMedicamento.itemSolicitacaoMedicamentoApac.procedimentoCidPrincipal.id = $('#procedimentoCidPrincipal').val();
		
		$.ajax({
			url: '/dispensacao/solicitacaoMedicamento/isProcedimentoApac', 
			type: "POST",
			data: JSON.stringify(itemSolicitacaoMedicamento),
			contentType: "application/json",
			success: function(result) {
				if(result){
					$('#medicamentoModal').modal('show');
					
					fncLimpaCamposItemSolicitacaoMedicamentoApac();
					fncHabilitaDesabilitaValidacaoBootstrap(false);
					fncHabilitaDesabilitaValidacaoBootstrap(true);
					fncValidaFormMedicamento();
					fncPopulaCamposMedicamentoApac();
					fncObrigatoriedadeQuantidadeTransplante($('#rbtTransplanteSim').prop("checked"));
					jQuery("#rbtGestanteNao").attr('checked', 'checked');
					$("#medicamentoNumeroAltura").mask('0,00');
				}
				else
					fncAdicionarMedicamento();
			},
		}).fail(
		   function( jqXHR) {
			   $.messageError(jqXHR);
		});
	}
}

function fncPopulaCamposMedicamentoApac(){
	
	var formMedicamento = $("#medicamentoForm").inputsToJSON();
	
	$('#idProcedimentoVigente').val($('#procedimentoVigente').val());
	$('#medicamentoApac').val($('#chrMedicamento').val());
	if($('#cid').val() != ''){
		$('#chrCidPrincipal').val($('#cid').val());
		$('#chrCidPrincipal').prop("disabled", true);
		$('#chrCidSecundario').prop("disabled", false);
	}else{
		$('#chrCidPrincipal').prop("disabled", false);
	}
	
	$('#isCidPadronizado').iCheck('check');
}

function fncLimpaCamposItemSolicitacaoMedicamentoApac()
{
	//$('#procedimentoCidPrincipal').val('');
	$('#procedimentoCidSecundario').val('');
	$('#chrCidPrincipal').val('');
	$('#chrCidSecundario').val('');
	$('#chrCidPrincipal').typeahead('val', '');
	$('#chrCidSecundario').typeahead('val', '');
	$('#txtQtdeMes1').val('');
	$('#txtQtdeMes2').val('');
	$('#txtQtdeMes3').val('');
}

function validaCidadaoSexo() {
	if($('#situacaoId').val() == '2' || $('#situacaoId').val() == ''){
		if ($('#nomeCidadao').val().length > 0){	
			if($('#sexo').val() != 0){ 	
				$('#modalPesquisarCidadao').prop("disabled", false);
			} else
				$('#modalPesquisarCidadao').prop("disabled", true);
		} else{
			$('#modalPesquisarCidadao').prop("disabled", true);
		}
	}
}

function popupCidadaoSimplificado(){
	var solicitacaoMedicamento = $("#solicitacaoMedicamentoForm").inputsToJSON().solicitacaoMedicamento;
	var cidadao = solicitacaoMedicamento.cidadaoPaciente;
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

function ajaxSetup(){
	$.ajaxSetup({
		beforeSend: function( xhr ) {
			var token = $("meta[name='_csrf']").attr("content");
			var header = $("meta[name='_csrf_header']").attr("content");
			xhr.setRequestHeader(header, token);
	 	}
	});
}

function fncPopulaCancelarMedicamento(id){
	$('#descricao').val('');
	$('#solicitacaoMedicamentoId').val(id);
	var itemSolicitacaoMedicamento = $("#solicitacaoMedicamentoForm").inputsToJSON();
	$('#cancelamentoMedicamentoModal').modal('show');
	fncPopulaCombo('listMotivosCancelamento', '#motivoCancelamento');
}

function fncCancelarSolicitacao(){
	var solicitacaoMedicamento = new Object();
	solicitacaoMedicamento.id = $('#solicitacaoMedicamentoId').val();
	
	$.ajax({
		url:'/dispensacao/solicitacaoMedicamento/cancelarSolicitacao', 
		type: "POST",
		data: JSON.stringify(solicitacaoMedicamento), 
		dataType: "html",
		contentType: "application/json",
		success: function(response){
			$('#cancelamentoMedicamentoModal').modal('hide');
		}
	});  
}

function fncLimparSolicitacao(){
	top.location.href="new";
}

function fncBlurMedicaoPrescritor(){
	if($('#chrEstabelecimento').val() == ''){
		fncLimparMedicoPrescritor();
	}
}

function fncLimparMedicoPrescritor(){
	$('#profissional').val('');
	$('#chrProfissional').typeahead('val','');
}

function popupEnderecoEntregaPaciente(){
	var idCidadao = $('#cidadaoPacienteId').val();
	$.ajax({
		url:'/dispensacao/enderecoEntregaPaciente/getCidadao/'+idCidadao, 
		type: "POST", 
		data: JSON.stringify($("#enderecoEntregaMedicamentoForm").cleanSpringErrors().inputsToJSON()), 
		dataType: "html",
		contentType: "application/json",
		success: function(response){
			$('#entregaPaciente').html(response);
				$('#entregaPacienteModal').modal('show');
			fncValidarCampos();
			if($('#situacaoId').val() != '' && $('#situacaoId').val() != '1'){
				fncHabilitaCamposEnderecoEntrega(false);
			}
		},
	});   
}

function fncLimpaPeriodoTratamento(){
	$('#tipoPeriodoTratamento').val(null);
}

function fncVoltar()
{
	var parametros = window.location.search.replace("?","");
	if(parametros.split('&').length > 1 && parametros.split('&')[1] == 'atendimento=true'){
		window.location.href='../dispensacaoMedicamento/getSolicitacaoMedicamento?codigoBarras='+
		$("#solicitacaoMedicamentoForm").inputsToJSON().solicitacaoMedicamento.cidadaoPaciente.id + " " + 
		$("#solicitacaoMedicamentoForm").inputsToJSON().solicitacaoMedicamento.codigoReceita;
	}else{
		window.location.href='returnToList';
	}
}