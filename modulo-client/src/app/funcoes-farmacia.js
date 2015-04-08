function fncAcionaAutoCompleteEstabelecimento() {
	fncAutoComplete(
			'/dispensacao/farmacia/listEstabelecimento?descricao=%QUERY',
			'#estabelecimento', 'idEstabelecimento');
}
function fncAcionaAutoCompleteProfissional() {
	fncAutoComplete('/dispensacao/farmacia/listProfissional?nome=%QUERY',
			'#farmaceutico', 'idProfissional');
}
function fncAcionaAutoCompleteEstabelecimentoFarmacia() {
	fncAutoComplete(
			'/dispensacao/farmacia/listEstabelecimento?descricao=%QUERY',
			'#estabelecimentoFarmacia', 'idEstabelecimentoFarmacia');
}

function removerEstabelecimento(estabelecimento) {
	var url = '/dispensacao/farmacia/removerEstabelecimento/' + estabelecimento
		
	$.ajax({
		url: url,
		success: function(result) {
			jQuery.noticeAdd({
				text : result.mensagem,
				stay : false,
				type : result.tipoMensagem
			});
			$("#grdEstabelecimento").load('/dispensacao/farmacia//getHTML/grdEstabelecimento');
		}
	});
	
}

function listarSetores() {
	if ($('#estabelecimentoId').val() != '') {
		var url = '/dispensacao/farmacia/listSetores/'
				+ $('#estabelecimentoId').val()
		document.getElementById('estabelecimentoSetorEstabelecimento').disabled = false;
	} else {
		document.getElementById('estabelecimentoSetorEstabelecimento').disabled = true;
	}
	if($('#estabelecimentoId').val() != '')
		fncPopulaCombo(url, '#estabelecimentoSetorEstabelecimento');
}

jQuery(function() {
	$('#estabelecimento').blur(function(){
		listarSetores();
	});
});

/*
jQuery(function() {
	$('#farmaciaForm').keydown(function(){
		$('input[type=text]').val (function () {
		    return this.value.toUpperCase();
		});
	});
});
*/

jQuery(function() {
	$('#btnIncluirEstabelecimento').click(function(){
		var rows = $('#grdEstabelecimento tr').length;
		if($('#idEstabelecimentoFarmacia').val() != ''){
			var url = '/dispensacao/farmacia/addEstabelecimento/' + $('#idEstabelecimentoFarmacia').val()
			$("#grdEstabelecimento").load(url, function(){
				$("#estblm2").val('');	
				$("#idEstabelecimentoFarmacia").val('');	
				$('#farmaciaForm').bootstrapValidator('enableFieldValidators', 'estabelecimento.id', false)
				if(rows == $('#grdEstabelecimento tr').length){
					jQuery.noticeAdd({
						text : 'Estabelecimento informado já possui vinculo com esta farmácia.',
						stay : false,
						type : 'error'
					});
				}
			});
		}else{
			$('#farmaciaForm').bootstrapValidator('revalidateField', 'estabelecimento.id');
		}
	});
});

function ajaxSetup(){
	$.ajaxSetup({
		beforeSend: function( xhr ) {
			var token = $("meta[name='_csrf']").attr("content");
			var header = $("meta[name='_csrf_header']").attr("content");
			xhr.setRequestHeader(header, token);
	 	}
	});
}

var filtrarProfissional = function(object) {
	return {
		value : object.cidadao.nome,
		id : object.id
	}

};

var filtrarProfissionalAutorizador = function(object) {
	return {
		value : object.profissionalSigas.cidadao.nome + " - " + object.ocupacao.nome,
		id : object.id,
		idProfissional : object.profissionalSigas.id
	}
	
};

function getProfissional(){
	var profissional = new Object();
	profissional.id = $('#idProfissionalAutorizador').data().idProfissional;
	
	if(profissional.id != undefined && profissional.id != ''){
		$.ajax({
			url: '/dispensacao/farmacia/getProfissional',
			type: 'POST',
			data: JSON.stringify(profissional),
			contentType: "application/json",
			success: function(result) {
				$('#cpf').val(fncFormataCpf(result.cidadao.cpf));
				$('#cns').val(fncFormataCns(result.cidadao.cartaoSus));
			},
			
		})
	}
}

function fncRealizaNumeracaoAutomatica(){
	$("#profissional").required($("#numeracaoAutomaticaApac").prop('checked'));
}

function fncLimpaFarmaceutico(){
	if($('#estblm').val() == ''){
		$('#idProfissional').val("");
		$('#farmaceutico').typeahead('val','');
	}
}
function fncLimpaProfissionalAutorizador(){
	if($('#estabelecimentoAutorizador').val() == ''){
		$('#profissional').typeahead('val','');
		$('#idProfissionalAutorizador').val('');
		$('#cpf').val('');
		$('#cns').val('');
		$('#idProfissionalAutorizador').data().idProfissionalAutorizador = null;
		$('#idProfissionalAutorizador').data().idProfissional = null;
		$('#idEstabelecimentoAutorizador').data().idEstabelecimento = null;
	} 
}