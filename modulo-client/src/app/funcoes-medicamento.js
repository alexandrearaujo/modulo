function fncValidacaoInicial()
{
	 if ($('#isCidPadronizado').prop("checked") && $('#procedimentoCidSecundario').val() != '')
	 	{
		 	$('#chrCidSecundario').prop("disabled", false);
	 	}
	 else
		 {
		 	$('#chrCidSecundario').prop("disabled", true);
		 }
		 
	 fncChangeTransplante();
	 
     $('.create-date-picker-dataInicio').datepicker({
    	minuteStep : 1,
    	showMeridian : false,
    	modalBackdrop: true,
    	defaultTime: false,
    	showInputs: false,
    	disableFocus: true,
    	format: "dd/mm/yyyy",
    	language:"pt-BR",
    	autoclose: true
     })
	 .on('changeDate', function(e) {
		$('#medicamentoForm').bootstrapValidator('revalidateField', 'solicitacaoMedicamento.solicitacaoMedicamentoApac.dataInicio');
		$('#medicamentoForm').data('bootstrapValidator').getInvalidFields();
		//$('.create-date-picker-dataFim').datepicker("setStartDate", e.date);
		//$('.create-date-picker-dataFim').datepicker("setDate");
	
        fncPreencherDataFinal(e.date);
     });
     

     $('.create-date-picker-dataFim').datepicker({
    	minuteStep : 1,
    	showMeridian : false,
    	modalBackdrop: true,
    	defaultTime: false,
    	showInputs: false,
    	disableFocus: true,
    	format: "dd/mm/yyyy",
    	language:"pt-BR",
    	autoclose: true
     })
	 .on('changeDate', function(e) {
        $('#medicamentoForm').bootstrapValidator('revalidateField', 'solicitacaoMedicamento.solicitacaoMedicamentoApac.dataFim');
     });

     $('.create-date-picker-dataInicioTratamento').datepicker({
    	minuteStep : 1,
    	showMeridian : false,
    	modalBackdrop: false,
    	defaultTime: false,
    	showInputs: false,
    	disableFocus: true,
    	format: "dd/mm/yyyy",
    	language:"pt-BR",		    	
    	autoclose: true
     });
	 
	
}

function fncHabilitaDesabilitaCidPadronizado(isChecked){
	limparCampo('chrCidPrincipal');
	limparCampo('chrCidSecundario');
	
	fncHabilitaDesabilitaCidSecundario(isChecked);
	
	if(isChecked){
		$.ajax({
			url: '/dispensacao/solicitacaoMedicamento/populaCidPrincipal',
			type: "POST",
			success: function(result) {
				if(result != ''){
					$('#procedimentoCidPrincipal').val(result.id);
					$('#chrCidPrincipal').val(result.procedimento.descricaoProcedimento);
					$('#chrCidPrincipal').prop("disabled", true);
				}
			}
		});
	}else{
		$('#chrCidPrincipal').prop("disabled", false);
	}
}

function fncHabilitaDesabilitaCidSecundario(isChecked){
	var idProcedimentoCidPrincipal = $('#procedimentoCidPrincipal').val();
	
	if (isChecked)
	{
		if (idProcedimentoCidPrincipal)
		{
			$('#chrCidSecundario').prop("disabled", false);
			$('#chrCidSecundario').focus();
		}
	}
	else
	{
		$('#chrCidSecundario').prop("disabled", true);
	}
}

var dataInicial;

function fncSetCompetenciaAtual()
{
	var url = '/dispensacao/medicamento/validarCompetenciaApac';
	var status;
	var mensagem;
	
	$.ajax({
		url: url,
		contentType: "application/json",
		type: "POST",
		success: function(result) {

			dataInicial = new Date(Date.parse(result[0]));
			var dataFinal = new Date(Date.parse(result[1]));
			//$('.create-date-picker-dataInicio').datepicker("setStartDate", dataInicial);
			//$('.create-date-picker-dataInicio').datepicker("setEndDate", dataFinal);
		},
		async: false});	
}

function fncValidarQuantidadeMedicamento(value)
{
	var idModal = 'medicamentoModal';
	var qtdeMes01 = $("#txtQtdeMes1").val();
	var qtdeMes02 = $("#txtQtdeMes2").val();
	var quantidadeTotal = parseInt(qtdeMes01) + parseInt(qtdeMes02) + parseInt(value);
	var url = '/dispensacao/medicamento/validarQuantidadeMaximaItemSolicitacaoMedicamentoApac?quantidadeTotalProcedimento='
		+quantidadeTotal+'&idProcedimentoVigente='+$('#idProcedimentoVigente').val();
	
    	if (quantidadeTotal == 0)
			{
	    		mensagem = "O Somatório das quantidades informadas para o medicamento não podem ser igual a 0";
	    		$.alertError(mensagem,idModal);
	    		
			}
    	else
    	{

    		$.ajax({
    			url: url,
    			async: false})
    			.fail(
			    function(jqXHR) {
			    	$("#txtQtdeMes3").val('');
			    	$.messageError(jqXHR,idModal);
			    	$("#txtQtdeMes3").focus();
			    });
    	}
    	
}

function fncValidaFormMedicamento()
{

	fncSetCompetenciaAtual();
	
	fncValidacaoInicial();

	$('#medicamentoForm').bootstrapValidator({
		  fields: {
	         dataInicio: {
	             validators: {            				
					 quantidadeTransplante: {
					    notEmpty: false      	
				 }  // quantidadeTransplante
	         }
	      }
	  }
	});
}

function fncPreencherDataFinal(dataInicial)
{
    var v90dias = 7776000000;
	
	var vDataInicio = new Date();
    vDataInicio = dataInicial;
    
    var vDataFim = new Date();
    var vDataFim =  new Date(vDataInicio.getTime() + v90dias);
    
	$('.create-date-picker-dataFim').datepicker('setDate', vDataFim);
	//$('.create-date-picker-dataFim').datepicker('setEndDate', vDataFim);
}

function fncObrigatoriedadeQuantidadeTransplante(value)
{

		 if (value)
		 {
			$('#spanObrigatorioQuantidadeTransplante').show();
			$('#quantidadeTransplante').prop("disabled",false);
		 }
		 else
		 {
			$('#spanObrigatorioQuantidadeTransplante').hide();
			$('#quantidadeTransplante').prop("disabled",true);
		 }
	 
}

function fncChangeTransplante()
{
	 $('#rbtTransplanteSim').change(function(){
		 
		 if (this.checked)	
		 {
			$('#quantidadeTransplante').val('');
			$('#medicamentoForm').bootstrapValidator('enableFieldValidators', 'solicitacaoMedicamento.solicitacaoMedicamentoApac.quantidadeTransplante', true);
		 }
		 
		 fncObrigatoriedadeQuantidadeTransplante(this.checked);
	 });

	 $('#rbtTransplanteNao').change(function(){
				 
		 if (this.checked)	
		 {
			$('#quantidadeTransplante').val('0');
			$('#medicamentoForm').bootstrapValidator('enableFieldValidators', 'solicitacaoMedicamento.solicitacaoMedicamentoApac.quantidadeTransplante', false);
			$('#medicamentoForm').bootstrapValidator('revalidateField', 'solicitacaoMedicamento.solicitacaoMedicamentoApac.quantidadeTransplante');
		 }
		 
		 fncObrigatoriedadeQuantidadeTransplante(!this.checked);
	 });
	
}

function fncPopulaSolicitacaoMedicamentoApac(){
	
	fncValidaInformacoesSolicitacao();
	fncValidaInformacoesComplementares();
	
	var isValid  = $('#medicamentoForm').data('bootstrapValidator').getInvalidFields().length == 0 ? true : false;
	
	if(isValid){

		var itemSolicitacaoMedicamento = $("#solicitacaoMedicamentoForm").inputsToJSON();
		itemSolicitacaoMedicamento.cidPadronizado = $('#isCidPadronizado').prop("checked");
		
		var itemSolicitacaoMedicamentoApac = $("#medicamentoForm").inputsToJSON().itemSolicitacaoMedicamentoApac;
		
//		if (itemSolicitacaoMedicamento.cidPadronizado)
//			itemSolicitacaoMedicamentoApac.cidNaoPadronizado = null;
//		else
//			{
//				itemSolicitacaoMedicamentoApac.cidNaoPadronizado.id = $('#procedimentoCidPrincipal').val();
//				itemSolicitacaoMedicamentoApac.procedimentoCidPrincipal = null;
//			}
		if($("#rbtGestanteNao").val() == 'FALSE')
			$("#rbtGestanteNao").val('false');
		if($("#rbtGestanteSim").val() == 'TRUE')
			$("#rbtGestanteNao").val('true');
		
		if($("#rbtTransplanteNao").val() == 'FALSE')
			$("#rbtTransplanteNao").val('false');
		if($("#rbtTransplanteSim").val() == 'TRUE')
			$("#rbtTransplanteSim").val('true');
		
		$('#chrCidPrincipal').prop("disabled", true);
		var solicitacaoMedicamentoApac = $("#medicamentoForm").inputsToJSON().solicitacaoMedicamento.solicitacaoMedicamentoApac;
		solicitacaoMedicamentoApac.numeroAltura = solicitacaoMedicamentoApac.numeroAltura.replace(",",""); 
		itemSolicitacaoMedicamento.itemSolicitacaoMedicamentoApac = itemSolicitacaoMedicamentoApac;
		itemSolicitacaoMedicamento.solicitacaoMedicamento.solicitacaoMedicamentoApac = solicitacaoMedicamentoApac;
		if($('#isCidPadronizado').prop("checked"))
			$('#cid').val($('#chrCidPrincipal').val());
		$.ajax({
			url: '/dispensacao/solicitacaoMedicamento/addMedicamentoApac', 
			type: "POST",
			data: JSON.stringify(itemSolicitacaoMedicamento),
			contentType: "application/json",
			success: function(response) {
				$('#medicamentoModal').modal('hide');
				$('#grdMedicamento').html(response);
				fncLimpaCamposMedicamento();
				fncHabilitaValidacaoMedicamento(false)
				fncValidaCamposMedicamento();
			},
		}).fail(
		   function( jqXHR) {
		       var response = $.parseJSON(jqXHR.responseText);
		       $.alertError(response.ex,'medicamentoModal');
	    });
	}
}


var filtrarPrincipal = function (object) {
	return {
					value: object.cid.codigoCid + " - " + object.cid.descricaoCid,
					id: object.id,
					codigoCid: object.cid.codigoCid,
					idCid: object.cid.id
		        }

}

var filtrarSecundario = function (object) {
	return {
					value: object.cid.codigoCid + " - " + object.cid.descricaoCid,
					id: object.id,
					idCid: object.cid.id
		        }
}

function fncValidaInformacoesSolicitacao(){
	$('#medicamentoForm').bootstrapValidator('revalidateField','solicitacaoMedicamento.solicitacaoMedicamentoApac.dataInicio');
	$('#medicamentoForm').bootstrapValidator('revalidateField','solicitacaoMedicamento.solicitacaoMedicamentoApac.dataFim');
	$('#medicamentoForm').bootstrapValidator('revalidateField','itemSolicitacaoMedicamentoApac.quantidadeSolicitadaMes1');
	$('#medicamentoForm').bootstrapValidator('revalidateField','itemSolicitacaoMedicamentoApac.quantidadeSolicitadaMes2');
	$('#medicamentoForm').bootstrapValidator('revalidateField','itemSolicitacaoMedicamentoApac.quantidadeSolicitadaMes3');
	$('#medicamentoForm').bootstrapValidator('revalidateField',$('#procedimentoCidPrincipal').prop("name"));
}

function fncValidaInformacoesComplementares(){
	$('#medicamentoForm').bootstrapValidator('revalidateField','solicitacaoMedicamento.solicitacaoMedicamentoApac.numeroPeso');
	$('#medicamentoForm').bootstrapValidator('revalidateField','solicitacaoMedicamento.solicitacaoMedicamentoApac.numeroAltura');
	$('#medicamentoForm').bootstrapValidator('revalidateField','solicitacaoMedicamento.solicitacaoMedicamentoApac.quantidadeTransplante');
}

function fncHabilitaDesabilitaValidacaoBootstrap(value){

	$('#medicamentoForm').bootstrapValidator('enableFieldValidators','solicitacaoMedicamento.solicitacaoMedicamentoApac.dataInicio', value);
	$('#medicamentoForm').bootstrapValidator('enableFieldValidators','solicitacaoMedicamento.solicitacaoMedicamentoApac.dataFim', value);
	$('#medicamentoForm').bootstrapValidator('enableFieldValidators','itemSolicitacaoMedicamentoApac.quantidadeSolicitadaMes1', value);
	$('#medicamentoForm').bootstrapValidator('enableFieldValidators','itemSolicitacaoMedicamentoApac.quantidadeSolicitadaMes2', value);
	$('#medicamentoForm').bootstrapValidator('enableFieldValidators','itemSolicitacaoMedicamentoApac.quantidadeSolicitadaMes3', value);
	$('#medicamentoForm').bootstrapValidator('enableFieldValidators','solicitacaoMedicamento.solicitacaoMedicamentoApac.numeroPeso', value);
	$('#medicamentoForm').bootstrapValidator('enableFieldValidators','solicitacaoMedicamento.solicitacaoMedicamentoApac.numeroAltura', value);
	$('#medicamentoForm').bootstrapValidator('enableFieldValidators',$('#procedimentoCidPrincipal').prop("name"), value);
	$('#medicamentoForm').bootstrapValidator('enableFieldValidators','solicitacaoMedicamento.solicitacaoMedicamentoApac.quantidadeTransplante', value);
	
}

function closeModalMedicamentoApac() {
	$('#medicamentoModal').modal('hide');
}

function fncLimpCidSecundario(){
	if($('#chrCidPrincipal').val() == ''){
		$('#procedimentoCidSecundario').val("");
		$('#chrCidSecundario').typeahead('val','');
	}
}
