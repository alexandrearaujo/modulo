$(window).on('resize', function () {
  if (window.innerWidth > 768) {
	$('.grouped-menu').removeClass('in');
  }
});

$(document).ready(function() {
	relogio();
	var isSolicitacaoMedicamento = window.location.pathname.indexOf('solicitacaoMedicamento') == -1 ? false:true;
	var isAtendimentoMedicamento = window.location.pathname.indexOf('atendimentoMedicamento') == -1 ? false:true;
	
	if( viewModelSenhaMvPainelModal.isObrigaSenhaTotem() && (isAtendimentoMedicamento || isSolicitacaoMedicamento) && ($('#senhaMvPainelMenuTop').attr('data-senha') == undefined || $('#senhaMvPainelMenuTop').attr('data-senha') == "")){
		$('#senhaMVPainelModal').modal('toggle');
	}
});

function relogio() {
	var dataAtual = new Date().toLocaleTimeString().replace("/.*(\d{2}:\d{2}:\d{2}).*/", "$1");
	$("#relogio").text(dataAtual);
	var umSegundoEmMilisegundos = 1000;
	setTimeout("relogio()", umSegundoEmMilisegundos);
}

function ViewModelSenhaMvPainelModal() {
	var self = this;
	
	self.senha = ko.observable();
	self.tipoOperacao =  ko.observable();
}

var EnumTipoOperacao = {
	INICIAR_ATENDIMENTO: {id:1, descricao:'Iniciar Atendimento'},
	REINICIO: {id:5 , descricao:'Atendimento Reiniciado'},
	FINALIZADO: {id:6 , descricao:'Atendimento Finalizado'}
}

ViewModelSenhaMvPainelModal.prototype.isObrigaSenhaTotem = function() {
	var isObrigatorio = false;
	$.ajax(
			{
				url : '/dispensacao/senhaMvPainel/isObrigaSenhaTotem',
				type : "GET",
				async : false,
				success : function(result) {
					isObrigatorio = result;
				},
			}).fail(function(response) {
				$.alertError($.getGenericMessage(response));
				isObrigatorio = false;
			});
	return isObrigatorio;
}

ViewModelSenhaMvPainelModal.prototype.iniciarAtendimentoGuiche = function() {
	var self = this;
	
	if(self.isObrigaSenhaTotem()){
		self.tipoOperacao(EnumTipoOperacao.INICIAR_ATENDIMENTO);
		$.ajax(
				{
					url : '/dispensacao/senhaMvPainel/registroAtividade/'+self.senha()+'/INICIAR_ATENDIMENTO',
					type : "POST",
					async : false,
					contentType : "application/json",
					success : function(result) {
						$('#senhaMVPainelModal').modal('toggle');
						$('#senhaMvPainelMenuTop').text('Atendendo Senha: '+self.senha());
						$('#senhaMvPainelMenuTop').attr('data-senha',self.senha());
						$('#idSenhaPainelSol').val(self.senha());
						
					},
				}).fail(function(response) {
					$.alertError($.getGenericMessage(response));
				});
	}
}

$('body').on('click', '#acaoIniciarSenhaMvPainel', function () {
	if( viewModelSenhaMvPainelModal.isObrigaSenhaTotem())
		$('#senhaMVPainelModal').modal('toggle');
});

$('body').on('click', '#acaoFinalizarSenhaMvPainel', function () {
	atualizarSenhaMvPainel($('#senhaMvPainelMenuTop').attr('data-senha'), 'FINALIZADO');
});

$('body').on('click', '#acaoPausarSenhaMvPainel', function () {
	atualizarSenhaMvPainel($('#senhaMvPainelMenuTop').attr('data-senha'), 'PAUSA');
});

$('body').on('click', '#acaoVoltarSenhaMvPainel', function () {
	atualizarSenhaMvPainel($('#senhaMvPainelMenuTop').attr('data-senha'), 'REINICIO');
});

$('body').on('show.bs.modal', '#senhaMVPainelModal', function () {
	viewModelSenhaMvPainelModal.senha('');
});

function atualizarSenhaMvPainel(senha, tipoOperacao){
	var senhaSelecionada = senha;
	if( viewModelSenhaMvPainelModal.senha() != '' && viewModelSenhaMvPainelModal.isObrigaSenhaTotem()){
		$.ajax(
				{
					url : '/dispensacao/senhaMvPainel/registroAtividade/'+senha+'/'+tipoOperacao,
					type : "POST",
					async : false,
					contentType : "application/json",
					success : function() {
						var $textoSenhaPainel = $('#senhaMvPainelMenuTop');
						if(tipoOperacao === 'PAUSA'){
							$textoSenhaPainel.text('Atendendo Senha - Pausa: '+senhaSelecionada);
						}
						if(!(tipoOperacao === 'FINALIZADO') && !(tipoOperacao === 'PAUSA')){
							$textoSenhaPainel.text('Atendendo Senha: '+senhaSelecionada);
						}
						$('#senhaMvPainelMenuTop').attr('data-senha',senhaSelecionada);
						if(tipoOperacao === 'FINALIZADO'){
							$textoSenhaPainel.text('');
							$textoSenhaPainel.attr('data-senha','');
							window.location.href = '/dispensacao';
						}
	        }
	      }).fail(function(response) {
					$.alertError($.getGenericMessage(response));
				});
	}
}

var viewModelSenhaMvPainelModal = new ViewModelSenhaMvPainelModal();

ko.applyBindings(viewModelSenhaMvPainelModal, document.getElementById("bodySenhaMVPainel"));
