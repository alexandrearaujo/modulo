function ajaxSetup(){	
	$.ajaxSetup({
		beforeSend: function( xhr ) {
			var token = $("meta[name='_csrf']").attr("content");
			var header = $("meta[name='_csrf_header']").attr("content");
			xhr.setRequestHeader(header, token);
	 	},
	 	headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
	});
}

jQuery(document).ajaxStart(function(){
	var isAutocomplete = isTypeaheadActive($(arguments[0].currentTarget.activeElement));
	if(!isAutocomplete){
		$('#progressModal').modal('show');
	}
});

jQuery(document).ajaxStop(function(){
	$('#progressModal').modal('hide');
});

jQuery(document).ajaxError(function(){
	$('#progressModal').modal('hide');
});

jQuery(document).ajaxSuccess(function(){
	$('#progressModal').modal('hide');
});

jQuery(document).ajaxComplete(function(){
	initBtnConfirmation();
	$('[data-toggle="tooltip"]').tooltip();
	$("td[rel='tooltip']").tooltip({
	    'placement': 'top',
	    'container':'body'
	});
	formatMask();
	fncUppercase();
	numbersOnly();
});

jQuery(document).ready(function(){
	ajaxSetup();
	initBtnConfirmation();
	initTimeField();
	initDateField();
	initDateFieldPeriodo();
	initNumberField();
	fncBlurCombo();
	fixCheckboxWithThymeleaf();
	initAutoComplete();
	formatMask();
	fncUppercase();
	numbersOnly();
	$('form').bootstrapValidator({});
	$("td[rel='tooltip']").tooltip({
	    'placement': 'top',
	    'container':'body'
	});
});