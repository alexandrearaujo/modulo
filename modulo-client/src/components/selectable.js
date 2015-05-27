/**
 * Checkbox-Field
 */
function initCheckboxField(){
	var targets = $('.checkbox-field');
	jQuery.each(targets, function(i, target){ 
		if( target !== undefined){
			var jQueryTarget = $(target);
			jQueryTarget.iCheck({ checkboxClass: 'icheckbox_minimal-blue' });
			jQueryTarget.on('ifChanged', function(){
				var functionName = jQueryTarget.attr('data-onchange');
				var f = new Function(functionName);
				f.call();
			});
		}
	});
}

/**
 * Radio-Field
 */
function initRadioField(){
	$('.radio-field').iCheck({
   		radioClass: 'iradio_minimal-blue radio'
  	});
}

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