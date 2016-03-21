
/**
 * Função para retornar o tamanho em px do texto.
 */
$.fn.textWidth = function(text, font) {
    if (!$.fn.textWidth.fakeEl) $.fn.textWidth.fakeEl = $('<span>').hide().appendTo(document.body);
    $.fn.textWidth.fakeEl.text(text || this.val() || this.text()).css('font', font || this.css('font'));
    return $.fn.textWidth.fakeEl.width();
};

Date.prototype.format = function(format){
	return this ? moment(this).format(format) : '';
}

function getHashId()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

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

function getInternetExplorerVersion()
{
  var rv = -1;
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  else if (navigator.appName == 'Netscape')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  return rv;
}

function isValid(viewModel) {
	if(ko.validatedObservable(viewModel).isValid()){
		return true;
	}else{
		var errors = ko.validation.group(viewModel);
		errors.showAllMessages();
		return false;
	}
}

function clearValidation(viewModel) {
	var errors = ko.validation.group(viewModel);
	errors.showAllMessages(false);
}

function loadPage(screen, viewModel) {
	if(!ko.dataFor(document.getElementById(screen))){
		var $container = $('#'+screen);
		
		$container.html(ko.load.view($container.data().pageUrl))
		
		ko.cleanNode(document.getElementById(screen));
		ko.applyBindings(viewModel, document.getElementById(screen));
		
		if(!viewModel.pages)
			viewModel.pages = [];
		viewModel.pages.push({id: screen, page: $container.data().pageUrl});
	}
	
	for (var i = 0, n = viewModel.pages.length; i < n; ++i) {
		var page = viewModel.pages[i];
		var $container = $('#'+page.id);
		
		$container.fadeIn('slow');
		
		if(screen != page.id)
			$container.hide();
	}
}