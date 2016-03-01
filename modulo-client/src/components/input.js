ko.bindingHandlers.inputMask = {
	init : function(element, valueAccessor, allBindings, viewModel, bindingContext) {
		var inputMask = valueAccessor(), $element = $(element);
		if (inputMask && !$.isEmptyObject(inputMask)) {
			var observable = inputMask.value;

			ko.utils.registerEventHandler(element, "change", function(e) {
				if (ko.isObservable(observable)) {
					observable($element.cleanVal());
				}
			});

			$element.val(inputMask.value());
			$element.mask(inputMask.mask);
		}
	},
	update : function(element, valueAccessor, allBindings, viewModel, bindingContext) {
		var inputMask = valueAccessor();

		if (inputMask && !$.isEmptyObject(inputMask)) {
			var observable = inputMask.value;
			var $element = $(element);

			var options = {
				onComplete : function(mask) {
					if (ko.isObservable(observable)) {
						observable($element.cleanVal());
					}
				}
			};

			$element.val(inputMask.value());
			$element.unmask();
			$element.mask(inputMask.mask, options);
		}
	}
};

/**
 * Number-Field
 */
function initNumberField(){
	var targets = $('.number-field input');
	jQuery.each(targets, function(i, target) { 
		if(target !== undefined) {
			var jQueryTarget = $(target);
			$(jQueryTarget).on('change', function() {
				var jQuerySelf = $(this);
				var functionName = jQuerySelf.attr('data-onchange');
				
		  	    if(jQuerySelf.val() !==  jQuerySelf.attr('data-previousValue')) {
		  	    	var f = new Function(functionName);
					f.call();
					jQuerySelf.attr('data-previousValue', jQuerySelf.val());
		  	    }
			});	
			
		}
	});
}

function fncUppercase() {
	$("input").keyup(function() {
		var textUpperCase = $(this).val().toUpperCase();
		if(window.getSelection().toString() === $(this).val()) {
			$(this).val(textUpperCase);
			$(this).select();
		} else {
			$(this).val(textUpperCase);
		}
	});
	$("textarea").keyup(function() {
		var textUpperCase = $(this).val().toUpperCase();
		if(window.getSelection().toString() === $(this).val()) {
			$(this).val(textUpperCase);
			$(this).select();
		} else {
			$(this).val(textUpperCase);
		}
	});
}

function numbersOnly() {
	jQuery('.numbersOnly').keyup(function () { 
	    this.value = this.value.replace(/[^0-9\.]/g,'');
	});
}

function formatMask() {
	$('.cns').mask('999.9999.9999.9999');
	$(".cpf").mask("999.999.999-99");
	$(".cnpj").mask("99.999.999/9999-99");
	$(".cep").mask("99999-999");
	$(".rg").mask("99.999.999-9");
}
