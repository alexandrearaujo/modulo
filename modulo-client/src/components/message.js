function setBtnConfirmation(){
	$('.confirmation-callback').confirmation({
		onConfirm: function() { 
			var jQuerySelf= jQuery(this);
			var method = jQuerySelf.attr('data-method');
			var defaultFunction = new Boolean(jQuerySelf.attr('data-defaultFunction'));
			var ajaxFunction = new Boolean(jQuerySelf.attr('data-ajaxFunction'));
			var msgSave = jQuerySelf.attr('data-msgSave');
			var idButtonSearch = jQuerySelf.attr('data-idButtonSearch');
			var funcao = jQuerySelf.attr('data-funcao');
			
			var idToExclude = jQuerySelf.attr('data-id');
			var url = method + '?id='+idToExclude;
			
			if (defaultFunction == true) {
				window.location=url; 
			} else if (ajaxFunction == true) {
				$.ajax({
					url: url,
					async: false,
					success: function(result) {
						$.alertSuccess(msgSave);
						if (result.status) {
							var rowCount = $('tbody#tbody_list tr').length;
							
							if (rowCount > 1) {
								$(button).parent().parent().remove();
							} else {
								var idButtonSearch = idButtonSearch;    											
								$('#' + idButtonSearch).click();
							}
						}
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
	$.getGenericMessage(responseData){
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