/*
 * time-field
 */
function initTimeField(){
	var targets = $('.time-field');

	jQuery.each(targets, function(i, target){ 
		if( target !== undefined){
			var jQueryTarget = $(target);
			
			var attrOnchangeValue;
			var idTarget = '#previous-value-' + jQueryTarget.attr('id');
			
			jQueryTarget.timepicker({
						        showMeridian : false,
							    showInputs: false,
							    disableFocus: true
							});
			
			if(jQueryTarget.attr('onchange') !== undefined){
				attrOnchangeValue = jQueryTarget.attr('onchange');
				jQueryTarget.off("onchange");
				jQueryTarget.removeAttr("onchange");
				
				jQueryTarget.on('change', function(){
					var currentValue = $(this).val();
				    var previousValue = $(idTarget).val(); 
				    
				    if(currentValue != previousValue){
				    	var f = new Function(attrOnchangeValue);
						f.call();
				    }
				});
			}
		}
	});
}

/*
* Date-Field
*/

function initDateField(){
	var targets = $('.date.date-field');

	jQuery.each(targets, function(i, target){ 
		if( target !== undefined){
			var jQueryTarget = $(target);
			var jQueryInputDateField = jQuery(jQueryTarget.find('.data-field-input')[0]);
			var startDate = jQueryInputDateField.attr('data-startdate');
			var endDate = jQueryInputDateField.attr('data-endDate');
			
			var confDatePicker = {
									 todayHighlight: true,
								     autoclose: true,
								     format: "dd/mm/yyyy",
								     language:"pt-BR"
								 };
			
			if(startDate != null)
				confDatePicker.startDate = startDate;
				
			if(endDate != null)
				confDatePicker.endDate = endDate;
			
			console.log(confDatePicker);
			console.log(jQueryTarget);
			jQueryTarget.datepicker(confDatePicker);
			
			console.log(jQueryInputDateField);
			
			jQueryInputDateField.mask('99/99/9999');
			
			jQueryInputDateField.change(function (){
				var targetName = jQueryInputDateField.attr('name');
				console.log('name: '+targetName);
		    	$(this.form).bootstrapValidator('revalidateField', targetName );
		    });
		}
	});
}

