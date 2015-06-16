
function initBtnConfirmation(){
	$('.confirmation-callback').confirmation({
		onConfirm: function() { 
			var jQuerySelf= jQuery(this);
			var method = jQuerySelf.attr('data-method');
			var ajaxFunction = new Boolean(jQuerySelf.attr('data-ajax'));
			var msgSave = jQuerySelf.attr('data-msgSave');
			var funcao = jQuerySelf.attr('data-funcao');
			
			var idToExclude = jQuerySelf.attr('data-id');
			var url = method + '?id='+idToExclude;
			
			if (ajaxFunction == false) {
				window.location=url; 
			} else if (ajaxFunction == true) {
				$.ajax({
					url: url,
					async: false,
					success: function(result) {
						$.alertSuccess(msgSave);
					}
				});
			}
			if (funcao != null) {
				var f = new Function(funcao.replace('()', '('+idToExclude+')'));
				f.call();
			}
				
		}
	});
}

(function($) {
	$.getGenericMessage = function(responseData) {
		return $.parseJSON(responseData.responseText).messageType;
	}
	
    $.alertSuccess = function(msg) {
    	$.notify({
			message: msg
		},{
			delay: 4000,
			type: 'success',
			z_index:9999
		});
    };
    
    $.alertInfo = function(msg) {
    	$.notify({
			message: msg
		},{
			delay: 4000,
			type: 'info',
			z_index:9999
		});
    };
    
    $.alertError = function(msg) {
    	$.notify({
			message: msg
		},{
			delay: 4000,
			type: 'danger',
			z_index:9999
		});
    };
    
    $.alertWarning = function(msg) {
    	$.notify({
			message: msg
		},{
			delay: 4000,
			type: 'warning',
			z_index:9999
		});
    };
}(jQuery));