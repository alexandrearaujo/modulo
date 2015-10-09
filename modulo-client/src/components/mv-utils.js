function getAppContext() {
	return "/" + window.location.pathname.split('/')[1];
}

/* -- TODO descomentar após a apresentação do dia 13/10
window.onerror = function (message, filename, linenumber) {
	if (linenumber === undefined) {
		return;
	}
	
	$.notify({
		icon: 'fa fa-exclamation-triangle',
		message: "Ocorreu um erro na página: " + message + ", na linha: " + linenumber + " do arquivo: " + filename
	},{
		delay: 0,
		newest_on_top: true,
		type: 'danger',
		animate: {
			enter: 'animated bounceIn',
			exit: 'animated bounceOut'
		},
		z_index:9999
	});
	
	return false;
}

*/