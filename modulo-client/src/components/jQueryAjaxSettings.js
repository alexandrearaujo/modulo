function ajaxSetup(){	
	$.ajaxSetup({
		beforeSend: function( xhr ) {
			var token = $("meta[name='_csrf']").attr("content");
			var header = $("meta[name='_csrf_header']").attr("content");
			if (token && !$.isEmptyObject(token) && header && !$.isEmptyObject(header)) {
				xhr.setRequestHeader(header, token);
			}
	 	},
	 	headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
	});
}

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
	initValidation();
	initBtnConfirmation();
//	initTimeField();
//	initDateFieldPeriodo();
	initNumberField();
	fncBlurCombo();
	fixCheckboxWithThymeleaf();
	initPopoverTableCell();
	formatMask();
	fncUppercase();
	numbersOnly();
	$("td[rel='tooltip']").tooltip({
	    'placement': 'top',
	    'container':'body'
	});
});

jQuery(document).load(function(){
	console.log('validation init');
});