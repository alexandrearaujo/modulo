
Date.prototype.format = function(format){
	return this ? moment(this).format(format) : '';
}

String.prototype.visualLength = function(){
    var ruler = document.getElementById('visualLength');
    var length;
    ruler.innerHTML = this;
    length = ruler.offsetWidth;
    ruler.innerHTML = '';
    
    return length;
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
