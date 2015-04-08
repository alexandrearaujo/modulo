function fncAutoComplete(vUrl,vElemento,vIdentificador) 
		{
			
			var bloodHound = new Bloodhound({
				datumTokenizer: function(d) {
					return Bloodhound.tokenizers.whitespace(d.val);
				},
				queryTokenizer: Bloodhound.tokenizers.whitespace,
				remote: {
					url: vUrl,
					replace: function (url, query) {
						
							url = url.replace('%QUERY',query);
							
							url += '&';
							
				            if (vElemento=='#chrCidPrincipal')
				            	{
				            	
				            		var cidPadronizado = $('#isCidPadronizado').prop("checked");
				            		
				            		url += 'isCidPadronizado=';
				            		url += encodeURIComponent(cidPadronizado);
				            	}
				            else
				            	{
					            	url += 'idProcedimentoPrincipal=';
					            	var vIdCidPrincipal = document.getElementById('idProcedimentoCidPrincipal').value;
					            	url += encodeURIComponent(vIdCidPrincipal);
				            	}
							
							
			            return url;
			        },					
					filter: function ( response ) {
						return $.map(response, function (object) {
							return {
								value: object.cid.codigoCid + " - " + object.cid.descricaoCid,
								codigoCid: object.cid.codigoCid,
								descricaoCid: object.cid.descricaoCid,
								id: object.id,
								idCid: object.cid.id
							};
						});
						} // filter
					} // remote
			}); // bloodHound
			 
			var promise = bloodHound.initialize();
		
			promise.fail(function() { console.log('err!'); });
			 
			$(vElemento)
			.typeahead(
				{
					minLength: 3,
					highlight: true
				},
				{
					name: 'cids',
					source: bloodHound.ttAdapter()
				}
			)
			.on('typeahead:selected', onSelected);
			
			function onSelected($e, objeto) {
				if (objeto.id != null)
					document.getElementById(vIdentificador).value = objeto.id;
				else
					document.getElementById('idCidNaoPadronizado').value = objeto.idCid;
					
			}
			
		}