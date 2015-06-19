function fncPopulaCombo(vUrl, vElemento) {
	var vIdentificador = vElemento + 'Id';
	$.post(vUrl, function(data) {
		$(vElemento).find('option').remove().end();
		$(vElemento).append($("<option></option>").attr("value", null).text(""));
		$.each(data, function(key, value) {
			if($(vIdentificador).val() == key) {
				$(vElemento).append($("<option selected></option>").attr("value", key).text(value));
			} else {
				$(vElemento).append($("<option></option>").attr("value", key).text(value));
			}
		});	
	});	
}

function fncBlurCombo() {
	$("select").blur(function (data) {
		var vElemento = '#'+data.target.name;
		var vIdentificador = '#'+data.target.name+'Id';
	    $(vIdentificador).val($(vElemento).val());
	});
}

function fixCheckboxWithThymeleaf() {
	$('.checkbox input[type=hidden]').insertBefore($('.checkbox input[type=checkbox ]'));
}