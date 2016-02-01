ko.bindingHandlers.mvautocomplete = {
	init : function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
		var suggestions = new Bloodhound({
			datumTokenizer : function(datum) {
				return Bloodhound.tokenizers.whitespace(datum.value);
			},
			queryTokenizer : Bloodhound.tokenizers.whitespace,
			remote : {
				url : valueAccessor().source,
				replace : function(url, uriEncodedQuery) {
					if (uriEncodedQuery.length >= 2)
						return url + '=' + encodeURIComponent(uriEncodedQuery.toUpperCase()) + getParams(valueAccessor().params);
					else
						return null;
				},
				wildcard : '%QUERY',
				filter : function(data) {
					return $.map(data, function(item) {
						var text = '';
						var keys = []
						if (valueAccessor().optionsLabel) {
							var text = valueAccessor().optionsLabel;
							var keys = getKeyParameter(valueAccessor().optionsLabel);
						} else {
							var text = valueAccessor().optionsText;
						}

						if (keys.length) {
							for (var i = 0, n = keys.length; i < n; ++i) {
								text = text.replace('{' + keys[i] + '}', findAttr(item, keys[i]));
							}
						} else {
							text = findAttr(item, valueAccessor().optionsText);
						}

						id = findAttr(item, valueAccessor().optionsValue);

						return {
							text : text,
							id : id,
							object : item
						};
					});
				}
			}
		});

		var $e = $(element);

		suggestions.initialize();

		$e.typeahead(null, {
			displayKey : 'text',
			minLength : 2,
			limit : 50,
			viewModel : viewModel,
			source : suggestions.ttAdapter()
		}).on('typeahead:selected', function(event, data) {
			var attrValue = findAttr(bindingContext.$parent, valueAccessor().value);
			var attrText = findAttr(bindingContext.$parent, valueAccessor().valueText);
			var otherValues = valueAccessor().otherValues;

			attrValue(data.id);
			attrText(data.text);

			if (otherValues) {
				$.map(otherValues, function(a) {
					for (k in a) {
						var valueField = findAttr(data.object, k);
						a[k](valueField);
					}
				});
			}
		});
	}
};

function getKeyParameter(str) {
	var results = [], re = /{([^}]+)}/g, text;

	while (text = re.exec(str)) {
		results.push(text[1]);
	}
	return results;
}

function getParams(params) {
	var strParams = '';
	$.map(params, function(a) {
		for (k in a) {
			if (a[k])
				strParams += '&' + k + '=' + a[k];
			else
				strParams += '&' + k + '=';
		}
	});

	return strParams;
}

function findAttr(o, s) {
	s = s.replace(/\[(\w+)\]/g, '.$1');
	s = s.replace(/^\./, '');
	var a = s.split('.');
	for (var i = 0, n = a.length; i < n; ++i) {
		var k = a[i];
		if (k in o) {
			o = o[k];
		} else {
			return;
		}
	}
	return o;
}