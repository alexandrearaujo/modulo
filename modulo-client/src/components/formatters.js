function sexoFormatter(sexo, row, index){
	
	if(sexo == 1){ 
		return "<i style='padding-left:1px' class='fa fa-lg fa-male mv-color-blue' data-toggle='tooltip' data-original-title='MASCULINO'></i>";	
	}else if(sexo == 2){
		return "<i style='padding-left:1px' class='fa fa-lg fa-female mv-color-pink' data-toggle='tooltip' data-original-title='FEMININO'></i>";	
	}
	return '';
}

function simOuNaoFormatter(flag, row, index){
	if(flag) 
		return "SIM";	
	else
		return "NÃO";	
}

function cartaoSusFormatter(cartaoSus, row, index){
	return formatCartaoSus(cartaoSus);
}

function cnpjFormatter(cnpj, row, index){
	return formatCNPJ(cnpj);
}

function cpfFormatter(cpf, row, index){
	return formatCPF(cpf);
}


//99.999.999/9999-99
function formatCNPJ(cnpj){
	if(cnpj){
		cnpj=cnpj.replace(/^(\d{2})(\d)/,"$1.$2");
		cnpj=cnpj.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3");
		cnpj=cnpj.replace(/\.(\d{3})(\d)/,".$1/$2");
		cnpj=cnpj.replace(/(\d{4})(\d)/,"$1-$2");
		return cnpj;
	}
    return '';
}

//999.9999-9999-9999
function formatCartaoSus(cartaoSus){
	if(cartaoSus){
		return cartaoSus.replace(/^(\d{3})(\d{4})(\d{4})(\d{4})/,"$1.$2-$3-$4");
	}
	return '';
}

//999.999.999-99
function formatCPF(cartaoSus){
	if(cartaoSus){
		return cartaoSus.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/,"$1.$2.$3-$4");
	}
	return '';
}