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
		Pace.start();
	}
});

jQuery(document).ajaxStop(function(){
	if(Pace.running){
		Pace.stop();
	}
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