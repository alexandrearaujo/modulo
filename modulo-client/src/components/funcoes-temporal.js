/*
 * time-field
 */
function setTimeField(){
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