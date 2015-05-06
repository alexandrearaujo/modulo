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