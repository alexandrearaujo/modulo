
function initBtnConfirmation() {
	$('.confirmation-callback').confirmation({
		onConfirm: function() { 
			var jQuerySelf= jQuery(this);
			var method = jQuerySelf.attr('data-method');
			var ajaxFunction = (jQuerySelf.attr('data-ajax') == 'true' ? true:false);
			var msgSave = jQuerySelf.attr('data-msgSave');
			var completeFunction = jQuerySelf.attr('data-function');
			var idToExclude = jQuerySelf.attr('data-id');
			var url = method + '?id='+idToExclude;
			
			if (ajaxFunction === false) {
				window.location = url; 
			} else if (ajaxFunction === true) {
				$.get(url).done(function() {
					if(method)
						$.alertSuccess(msgSave);
				})
				.fail(function(response) {
					$.alertError($.getGenericMessage(response));
				})
				.always(function() {
					if (completeFunction != null) {
						var renamedCompleteFunction = new Function(completeFunction.replace('()', '('+idToExclude+')'));
						renamedCompleteFunction.call();
					}
				});
			}
		}
	});
}

(function($) {
	$.getGenericMessage = function(responseData) {
		var erroMessage = $.parseJSON(responseData.responseText).ex;
		
		if(erroMessage == undefined){
			console.log(responseData.responseJSON);
			responseData.erroMessage = "Erro interno - Contate o administrador.";
			
			erroMessage = responseData;
		}

		return erroMessage;
	};
	
    $.alertSuccess = function(msg) {
    	$.notify({
			message: msg
		},{
			delay: 8000,
			type: 'success',
			z_index:9999
		});
    };
    
    $.alertInfo = function(msg) {
    	$.notify({
			message: msg
		},{
			delay: 8000,
			type: 'info',
			z_index:9999
		});
    };
    
    $.alertError = function(msg) {
    	if((typeof msg) == "object"){
    		$('#errorDialogTitle').text('');
        	$('#errorDialogMessage').html('');
    		var erroMsg = msg.responseJSON.path+" </br> "+msg.responseJSON.error +" </br> "+msg.responseJSON.exception+" </br> "+msg.responseJSON.message;
        	$('#errorDialogTitle').text(msg.erroMessage);
        	$('#errorDialogMessage').html(erroMsg);
        	$("#modalErrorDialog").modal();
    	}else{
    		$.notify({
    			message: msg
    		},{
    			delay: 600000,
    			type: 'danger',
    			z_index:9999
    		});
    	}
    	
    };
    
    $.alertWarning = function(msg) {
    	$.notify({
			message: msg
		},{
			delay: 8000,
			type: 'warning',
			z_index:9999
		});
    };
}(jQuery));