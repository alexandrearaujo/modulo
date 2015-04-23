(function($) {
    $.fn.required = function(isRequired) {
    	if ( !arguments.length ) {
    		var label = $('#'+ this.prop('id') + "Label");
    		return label.hasClass('required');
    	}
    	
    	this.each(function(index, element){
    		var label = $('#'+ this.id + "Label");
    		var $element = $(element);
    		var $form = $(element.form);
    		
    		if(isRequired && !label.hasClass('required')){
    			label.addClass('required');
    		}else if(!isRequired){
    			label.removeClass('required');
    		}
    		
    		if($element.hasClass('typeahead')){
    			var $hidden = $element.parent().prev();
    			$form.bootstrapValidator('enableFieldValidators', $hidden.prop('name'), isRequired);
    		}else{
    			$form.bootstrapValidator('enableFieldValidators', element.name, isRequired);
    		}
    	});
    };
    
    $.fn.message = function(message, type){
    	$.message(message, type, this.prop("id"));
    }
    
    $.messageError = function(jqXHR, modal) {
    	var response = $.parseJSON(jqXHR.responseText);
    	$.message(response.ex, response.messageType, modal);
    };
    
    $.message = function(message, type, modal) {
    	$.growl({
    		message: message,
    		url: document.URL
    	},{
    		element: modal == null ? document.body : "#" + modal,
    		delay: 4000,
    		type: type
    	});
    };
    
    $.alertSuccess = function(message, modal) {
    	$.message(message, 'success', modal);
    };
    
    $.alertInfo = function(message, modal) {
    	$.message(message, 'info', modal);
    };
    
    $.alertError = function(message, modal) {
    	$.message(message, 'danger', modal);
    };
    
    $.alertWarning = function(message, modal) {
    	$.message(message, 'warning', modal);
    };
    
}(jQuery));