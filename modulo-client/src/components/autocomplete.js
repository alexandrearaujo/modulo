var onSelected;
var required;

function AutoComplete(){}

function initAutoComplete() {
	var arrayInputs = $('.typeahead.input-autocomplete');
	jQuery.each(arrayInputs, function(i, input) { 
		if(input !== undefined) {
			var jQueryTarget = $(input);
			if(!isTypeaheadActive(jQueryTarget)){
				var targetArray = [];	 
				var url = jQueryTarget.attr('data-url');
				var parameters = jQueryTarget.attr('data-parameters');
				var hasParameters = false;
			
				if(parameters != null || parameters !== undefined) {
				   	url = url.concat(parameters);
				 	hasParameters = true; 
				}
				
				targetArray['object']     =   jQueryTarget.attr('data-object');
				targetArray['list']       =   jQueryTarget.attr('data-list');
				targetArray['onSelected'] =   jQueryTarget.attr('data-onSelected');
				targetArray['idHidden']   =   jQueryTarget.attr('data-idHidden');
				hasParameters =   parameters != null; 
				var fncName   =   jQueryTarget.attr('data-fncName');
				
				AutoComplete.prototype.autocomplete(url, targetArray, fncName, hasParameters);
			}
		}
	});
}

AutoComplete.prototype.autocomplete = function(vurl, target, fncName, hasParameters){
	 var idHidden = target['idHidden'];
	 AutoComplete.prototype.bloodHound = new Bloodhound({
		datumTokenizer: function(d) {
			return Bloodhound.tokenizers.whitespace(d.val);
		},
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		limit: 100,
		remote: {
			url: vurl,
            replace: function (url, query) {
            	idHidden = target['idHidden'];
            	onSelected = target['onSelected'];
            	required = target['required'];
            	url = hasParameters ? url.replace('%QUERY',query+"&") : url.replace('%QUERY',query); 
            	
                if(hasParameters) {
	                var parameters = url.indexOf('&');
	                var param = url.substr(parameters+1);
	                var arr = param.split(",");
	                url = url.substr(0,parameters);
               
		            for(var i in arr) {
		                url += '&';
		                var v = arr[i].split("=");
		                url += v[0]+"=";
		                url +=eval(v[1]);
		            }
                }
                
                return url;
            },
            filter: function ( response ) {
        	    return $.map(response, window[fncName]);
            }
		}		
	});
	
	var promise = AutoComplete.prototype.bloodHound.initialize();

	promise.fail(function() { console.log('err!'); });

	$('#'+target['object']).blur(function(){
		if(this.value === '') {
			$('#'+idHidden).val('');
			if($(this).required()) {
				$(this.form).bootstrapValidator('revalidateField', $('#'+idHidden).prop('name'));
			}
		}
	});
	
	$('#'+target['object']).typeahead(
		{
			minLength: 3,
			highlight: true
		},
		{ 
			name: target['list'],
			source: AutoComplete.prototype.bloodHound.ttAdapter()
		}
	)
	.on('typeahead:opened', onOpened2)
	.on('typeahead:autocompleted', onAutocompleted2)
	.on('typeahead:selected', function ($e, datum){
		$('#'+idHidden).data(datum);
		$('#'+idHidden).val(eval(onSelected));
	 	if($(this).required()){
			$(this.form).bootstrapValidator('revalidateField', $('#'+idHidden).prop('name'));
		}	
	});
}; 

function onOpened2($e) {}

function onAutocompleted2($e, datum) {}

function limparCampo(campo){
	$("#"+campo).typeahead('val', '');
}

function setarValor(campo,valor){
	$("#"+campo).typeahead('val', valor);
}

function isTypeaheadActive($element){
	return $element.data('ttTypeahead') ? true:false;
}