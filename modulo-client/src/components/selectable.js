function fncPopulaComboWithJquery(vUrl, $combo) {
	$.post(vUrl, function(data) {
		$combo.find('option').remove().end();
		$combo.append($("<option></option>").attr("value", null).text(""));
		$.each(data, function(key, value) {
			if($combo.val() == key) {
				$combo.append($("<option selected></option>").attr("value", key).text(value));
			} else {
				$combo.append($("<option></option>").attr("value", key).text(value));
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