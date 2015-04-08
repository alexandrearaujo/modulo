function fncValidarCampos() {
	
	$("input").keyup(function(){
	    $(this).val($(this).val().toUpperCase());
	});
	setarURL($('#uf :selected').val());
	getEnderecoCidadao();
	verificarPreenchimentoCEP();
	$("#txtNomePaciente").prop("disabled", true);
	$("#txtTelefone").mask("(00) 00009-0000");
	$("#cep").mask("99999-999");

	
	$('#enderecoEntregaMedicamentoForm')
	.on(
		'click',
		'[name="btnSalvar"]',
		function() {
			salvarEnderecoEntregaPaciente();
	});
	
	$('#enderecoEntregaMedicamentoForm').bootstrapValidator({
    	fields: {
    		nomeResponsavel:{
    			validators: {
    				notEmpty: {
    					message: 'Campo obrigatório'
    				}
    
    			}
    		},
    		numeroResidencia:{
    			validators: {
    				notEmpty: {
    					message: 'Campo obrigatório'
    				},
    				digits: {
                		message: 'Este campo deverá conter apenas números'
            		}
    			}
    		},
    		cep: {
    			validators: {
    				stringLength: {
                        min: 9,
                        message: 'CEP inválido'
                    },
                    callback:{
                    	callback: function (value, validator) {
                    		if($('#cep').val().length == 9 || $("#cep").val().replace('-', '').length == 8)
                    		{
	                    		var url = '/dispensacao/enderecoEntregaPaciente/getEnderecoPorCep/'+ $('#cep').val();
	                            var status;
	                            var mensagem;
                            
                            	$.ajax({
                             		url: url,
                             		success: function(result) {
                              			status = result.status;
                              
	                              		if (status)
                              			{
	                              			$('#bairro').val(result.objeto.bairro);
	                              			$('#logradouro').val(result.objeto.logradouro);
	                              			$('#chrMunicipio').val(result.objeto.municipio.descricaoMunicipio);
	                              			$('#municipio1').val(result.objeto.municipio.municipioId);
	                              			$('#uf').val(result.objeto.uf.id);
	                              			$('#complementoEndereco').val(result.objeto.complementoEndereco);
	                    					
	                    					$('#uf').prop("disabled", true);
	                    					$('#bairro').prop("disabled", true);
	                    					$('#logradouro').prop("disabled", true);
    	                					$('#chrMunicipio').prop("disabled", true);
    	                      			}
        	                      		else
            	              			{
        	                      			mensagem = result.mensagem;		                	              			
        	                  			}
                             		},
                             		fail: function(result) {
                              			return false;
                             		},
                             		async: false})
                               	return {
                                	valid: status,
                                	message: mensagem
                                };
                    		}
                    		$('#uf').prop("disabled", false);
             				$('#bairro').prop("disabled", false);
             				$('#logradouro').prop("disabled", false);
            				$('#chrMunicipio').prop("disabled", false);
                    		return true
                          }
                    }
    			}
    		},
    		municipio:{
    			validators: {
    				notEmpty: {
    					message: 'Campo obrigatório'
    				}
    			}
    		},
    		bairro:{
    			validators: {
    				notEmpty: {
    					message: 'Campo obrigatório'
    				}
    			}
    		},
    		logradouro:{
    			validators: {
    				notEmpty: {
    					message: 'Campo obrigatório'
    				}
    			}
    		},
    		tipoLogradouro:{
    			validators: {
    				notEmpty: {
    					message: 'Campo obrigatório'
    				}
    			}
    		},
    		uf:{
    			validators: {
    				notEmpty: {
    					message: 'Campo obrigatório'
    				}
    			}
    		}
    	}
    } 
    );
}

function getEnderecoCidadao() {

	var utilizaEnderecoPaciente = $("#utilizaEnderecoPaciente");
	if(utilizaEnderecoPaciente.prop('checked'))
	{
	    var url = '/dispensacao/enderecoEntregaPaciente/getEnderecoCidadao/'+ utilizaEnderecoPaciente.prop('checked')+'/'+ $('#pacienteId').val();
	    $.get(url,function(result) {
   			$('#cep').val(result.objeto.cep);
			if(result.objeto.uf != null)
			{
       			$('#uf').val(result.objeto.uf.id);
			}
			else
			{
				$('#uf').val('')
			}
			if(result.objeto.municipio)
			{
       			$('#municipio1').val(result.objeto.municipio.municipioId);
       			$('#chrMunicipio').val(result.objeto.municipio.descricaoMunicipio);
			}
			else
			{
				$('#municipio1').val('');
       			$('#chrMunicipio').val('');
			}
			$('#bairro').val(result.objeto.bairro);
			if(result.objeto.tipoLogradouro != null)
			{
   				$('#tipoLogradouroId').val(result.objeto.tipoLogradouro.id);
			}
			else
			{
				$('#tipoLogradouroId').val('');
			}
   			$('#logradouro').val(result.objeto.logradouro);
   			$('#numeroResidencia').val(result.objeto.numeroResidencia);
   			$('#complementoEndereco').val(result.objeto.complementoEndereco);
			
   			fncHabilitaCamposEndereco(false);
		});
	}
	else
	{
		fncHabilitaCamposEndereco(true);
	}
}

function verificarPreenchimentoCEP()
{ 
	if($('#cep').val() != null)
		if($('#cep').val().length > 0)
		{
			$('#uf').prop("disabled", true);
			$('#bairro').prop("disabled", true);
			$('#logradouro').prop("disabled", true);
			$('#chrMunicipio').prop("disabled", true);
		}
}

function setarURL(param)
{
//	listMunicipioPorUF('/dispensacao/enderecoEntregaPaciente/listMunicipioPorUF?descricao=%QUERY');
}

function limparMunicipio() {
	$('#municipio1').val("");
	$('#chrMunicipio').typeahead('val','');
}

function salvarEnderecoEntregaPaciente(){
	fncValidaCamposEndereco();
	
	var isValid  = $('#enderecoEntregaMedicamentoForm').data('bootstrapValidator').getInvalidFields().length == 0 ? true : false;
	
	if(isValid){
		$.ajax({
			url:'/dispensacao/enderecoEntregaPaciente/save', 
			type: "POST",
			data: JSON.stringify($("#enderecoEntregaMedicamentoForm").inputsToJSON()),
			async: false,
			contentType: "application/json",
			success: function(result) {
				jQuery.noticeAdd({
					text : result.mensagem,
					stay : false,
					type : result.tipoMensagem
				});
				closeModalEnderecoEntregaPaciente();
			},
		});   
	}
}

var filtrarMunicipio = function (object) {
	return {
		value : object.descricaoMunicipio,
		id : object.municipioId,
	}
}

function fncHabilitaCamposEndereco(flag){
	$('#cep').prop("disabled", !flag);
	$('#chrMunicipio').prop("disabled", !flag);
	$('#uf').prop("disabled", !flag);
	$('#bairro').prop("disabled", !flag);
	$('#tipoLogradouroId').prop("disabled", !flag);
	$('#logradouro').prop("disabled", !flag);
	$('#numeroResidencia').prop("disabled", !flag);
	$('#complementoEndereco').prop("disabled", !flag);
}

function fncHabilitaCamposEnderecoEntrega(flag){
	$('#paciente').prop("disabled", !flag);
	$('#nomeResponsavel').prop("disabled", !flag);
	$('#txtTelefone').prop("disabled", !flag);
	$('#cep').prop("disabled", !flag);
	$('#chrMunicipio').prop("disabled", !flag);
	$('#uf').prop("disabled", !flag);
	$('#bairro').prop("disabled", !flag);
	$('#tipoLogradouroId').prop("disabled", !flag);
	$('#logradouro').prop("disabled", !flag);
	$('#numeroResidencia').prop("disabled", !flag);
	$('#complementoEndereco').prop("disabled", !flag);
	$('#btnSalvarEndereco').prop("disabled", !flag);
	$('#utilizaEnderecoPaciente').prop("disabled", !flag);
	
}

function fncMascaraTelefone(){
	var phone = $("#txtTelefone").val().replace(/\D/g, '');
	if(phone.length > 10) {
		$("#txtTelefone").mask("(00) 00000-0000");
    } else {
    	$("#txtTelefone").mask("(00) 0000-00009");
    }
	$('#enderecoEntregaMedicamentoForm').bootstrapValidator('revalidateField','telefoneResponsavel');
}

function fncValidaCamposEndereco(){
	$('#enderecoEntregaMedicamentoForm').bootstrapValidator('revalidateField','nomeResponsavel');
	$('#enderecoEntregaMedicamentoForm').bootstrapValidator('revalidateField','uf.id');
	$('#enderecoEntregaMedicamentoForm').bootstrapValidator('revalidateField','municipio.municipioId');
	$('#enderecoEntregaMedicamentoForm').bootstrapValidator('revalidateField','tipoLogradouro');
	$('#enderecoEntregaMedicamentoForm').bootstrapValidator('revalidateField','bairro');
	$('#enderecoEntregaMedicamentoForm').bootstrapValidator('revalidateField','logradouro');
	$('#enderecoEntregaMedicamentoForm').bootstrapValidator('revalidateField','numeroResidencia');
}