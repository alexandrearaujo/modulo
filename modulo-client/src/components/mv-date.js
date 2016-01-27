$.fn.datepicker.defaults.todayHighlight = true;
$.fn.datepicker.defaults.format = 'dd/mm/yyyy';
$.fn.datepicker.defaults.autoclose = true;
$.fn.datepicker.defaults.language = 'pt-BR';

ko.bindingHandlers.mvdate = {
	init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

		var $element = $(element);
		var $elementRender;
		
		if($element.is('input')){
			$elementRender = $element;
			$elementRender.mask('99/99/9999');
		}else{
			$elementRender = $element.find('.input-date-field')
			$elementRender.find('input').mask('99/99/9999');
		}
		
	    var options = jQuery.isEmptyObject(valueAccessor()) ? $.fn.datepicker.defaults : valueAccessor();
	    
	    $elementRender.datepicker(options);
	    
	    ko.utils.registerEventHandler(element, "clearDate", function () {
	    	var observable = bindingContext.$component.params.value;
	        observable(null);
	    });
	    
	    ko.utils.registerEventHandler(element, "changeDate", function () {
	        var observable = bindingContext.$component.params.value;
	        var date = $elementRender.datepicker("getDate");
	        var dateFormat = date ? date.format(options.format.toUpperCase()) : null;
	        
	        observable(dateFormat);
	        console.log();
	    });
	
	    ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
	    	$elementRender.datepicker("destroy");
	    });

	
	},
	update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
		var $element = $(element);
		var $elementRender = $element.is('input') ? $element : $element.find('.input-date-field');
		var options = jQuery.isEmptyObject(valueAccessor()) ? $.fn.datepicker.defaults : valueAccessor();
		var value = ko.utils.unwrapObservable(bindingContext.$component.params.value());
		var date = value ? moment(value, options.format.toUpperCase()).toDate() : null;
		$elementRender.datepicker("setDate", date);
		$elementRender.val(value);
    }
};