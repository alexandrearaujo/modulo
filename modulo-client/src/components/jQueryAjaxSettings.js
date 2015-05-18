function ajaxSetup(){	

	/*
	 * Dispencacao
	 */
//	$.ajaxSetup({
//		beforeSend: function( xhr ) {
//			var token = $("meta[name='_csrf']").attr("content");
//			var header = $("meta[name='_csrf_header']").attr("content");
//			xhr.setRequestHeader(header, token);
//	 	}
//	});
	
	/*
	 * Estratificacao
	 */
	$.ajaxSetup({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         }
    });
}

jQuery(document).ajaxComplete( function(){
	setBtnConfirmation();
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
	setBtnConfirmation();
	initTimeField();
	initDateField();
	initDateFieldPeriodo();
	initPaginationBar();
	initNumberField();
	initCheckboxField();
	fncBlurCombo();
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