/**
 * Number-Field
 */
function initNumberField(){
	var targets = $('.number-field input');
	jQuery.each(targets, function(i, target){ 
		if( target !== undefined){
			var jQueryTarget = $(target);
			$(jQueryTarget).on('change', function(){
				var jQuerySelf = $(this)
				var currentValue = jQuerySelf.val();
				var functionName = jQuerySelf.attr('data-onchange');
				
		  	    if( jQuerySelf.val() !=  jQuerySelf.attr('data-previousValue')){
		  	    	var f = new Function(functionName);
					f.call();
					jQuerySelf.attr('data-previousValue', jQuerySelf.val());
		  	    }
			});	
			
		}
	});
}