function fncPopulaCombo(vUrl, vElemento){
	var vIdentificador = vElemento + 'Id';
	$.post(vUrl, function(data) {
		$(vElemento).find('option').remove().end();
		$(vElemento).append(
				$("<option></option>").attr("value", null).text(""));
		$.each(data, function(key, value) {
			if($(vIdentificador).val() == key){
				$(vElemento).append(
						$("<option selected></option>").attr("value", key).text(
								value));
			}else{
				$(vElemento).append(
						$("<option></option>").attr("value", key).text(
								value));
			}
		});	
	});	
}

function fncBlurCombo(){
	$("select").blur(function (data) {
		var vElemento = '#'+data.target.name;
		var vIdentificador = '#'+data.target.name+'Id';
	    $(vIdentificador).val($(vElemento).val());
	});
}

function fncUppercase(){
	$("input").keyup(function(e){
		var textUpperCase = $(this).val().toUpperCase();
		if(window.getSelection().toString() == $(this).val()){
			$(this).val(textUpperCase);
			$(this).select();
		}else{
			$(this).val(textUpperCase);
		}
	});
	$("textarea").keyup(function(e){
		var textUpperCase = $(this).val().toUpperCase();
		if(window.getSelection().toString() == $(this).val()){
			$(this).val(textUpperCase);
			$(this).select();
		}else{
			$(this).val(textUpperCase);
		}
	});
}

function fncIdade(fromdate, todate){
    if(todate) todate= new Date(todate);
    else todate= new Date();

    var age= [], fromdate= new Date(fromdate),
    y= [todate.getFullYear(), fromdate.getFullYear()],
    ydiff= y[0]-y[1],
    m= [todate.getMonth(), fromdate.getMonth()],
    mdiff= m[0]-m[1],
    d= [todate.getDate(), fromdate.getDate()],
    ddiff= d[0]-d[1];

    if(mdiff < 0 || (mdiff=== 0 && ddiff<0)){
    	--ydiff;
    }
    
    if(mdiff<0) {
    	mdiff+= 12;
    }
    
    if(ddiff<0){
        fromdate.setMonth(m[1]+1, 0);
        ddiff= fromdate.getDate()-d[1]+d[0];
        --mdiff;
    }
    
    if(ydiff> 0) {
    	age.push(ydiff+ ' year'+(ydiff> 1? 's ':' '));
    }
    
    if(mdiff> 0) {
    	age.push(mdiff+ ' month'+(mdiff> 1? 's':''));
    }
    
    if(ddiff> 0) {
    	age.push(ddiff+ ' day'+(ddiff> 1? 's':''));
    }
    
    if(age.length>1) {
    	age.splice(age.length-1,0,' and ');    
    }
    
    return age.join('');
}

function fncMascaraCep(cep){
	return cep.substr(0,5) + "-" + cep.substr(5,7);
}

function fncFormataCpf(cpf){
	if(cpf != null)
		return cpf.substr(0,3) + "." + cpf.substr(3,3)+ "." + cpf.substr(6,3) + "-" + cpf.substr(9,2);
	else
		return "";
}

function fncFormataCns(cns){
	if(cns != null && cns != '')
		return cns.substr(0,3) + "." + cns.substr(3,4)+ "." + cns.substr(7,4) + "-" + cns.substr(11,4);
	else
		return "";
}

function fncFormataData(data){
	return data.substr(8,2) + "/" + data.substr(5,2)+ "/" + data.substr(0,4);
}

function numbersOnly(){
	jQuery('.numbersOnly').keyup(function () { 
	    this.value = this.value.replace(/[^0-9\.]/g,'');
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

function formatMask() {
	$('.cns').mask('999.9999.9999.9999');
	$(".cpf").mask("999.999.999-99");
}