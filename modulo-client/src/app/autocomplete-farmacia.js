function fncAutoComplete(vUrl, vElemento, vIdentificador) {

	var bloodHound;
	if(vIdentificador == 'idProfissional'){
		bloodHound = new Bloodhound({
    	datumTokenizer: function(d) {
    	    return Bloodhound.tokenizers.whitespace(d.val);
    	},
    	queryTokenizer: Bloodhound.tokenizers.whitespace,
		remote: {
	        url: vUrl,
	       	filter: function ( response ) {
	            return $.map(response, function (object) {
	             return {
	              value: object.profissionalSigas.cidadao.nome,
	              id: object.id,
	             };
	            });
	            }		
	    }
	});}else{
		bloodHound = new Bloodhound({
    	datumTokenizer: function(d) {
    	    return Bloodhound.tokenizers.whitespace(d.val);
    	},
    	queryTokenizer: Bloodhound.tokenizers.whitespace,
		remote: {
	        url: vUrl
	    }
	});}
    	 
	var promise = bloodHound.initialize();
	
	promise
	.fail(function() { console.log('err!'); });
	
	if(vIdentificador == 'idProfissional'){	 
		$(vElemento)
			.typeahead(
				{
					minLength: 3,
					highlight: true
				},
				{
		    		name: 'profissionais',
		    		source: bloodHound.ttAdapter()
	    		}
			)
		    .on('typeahead:selected', onSelected)
	}else{
		$(vElemento)
        .typeahead(
            {
                minLength: 3,
                highlight: true
            },
            {
                name: 'estabelecimentos',
                displayKey: 'nomeFantasia',
                source: bloodHound.ttAdapter()
            }
        )
        .on('typeahead:selected', onSelected)
	}
	
	function onSelected($e, datum) {
		document.getElementById(vIdentificador).value = datum.id;
	}
}
