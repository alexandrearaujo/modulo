$.fn.datepicker.defaults.todayHighlight = true;
$.fn.datepicker.defaults.format = 'dd/mm/yyyy';
$.fn.datepicker.defaults.autoclose = true;
$.fn.datepicker.defaults.language = 'pt-BR';

ko.bindingHandlers.mvDate = {
	init : function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
		var params = bindingContext.$component ? bindingContext.$component.params : valueAcessor(),
			options = $.extend({}, $.fn.datepicker.defaults, valueAccessor()),
			observable = params.value, 
			$pickerRenderEl = $(element);

		/**
		 * Evento necessário para impedir a visualização do datepicker
		 * quando o mesmo estiver desabilitado
		 */
		ko.utils.registerEventHandler(element, "show", function(e) {
			if (params.disabled) {
				$pickerRenderEl.datepicker('hide')
			}
		});

		ko.utils.registerEventHandler(element, "clearDate", function() {
			if (observable) {
				observable(null);
			}
		});

		ko.utils.registerEventHandler(element, "changeDate", function(event) {
			var date, dateFormat, 
				formatParts = options.format.split('/')
				fieldParts = $(event.currentTarget).find('input').val().split('/');
			
			var formatEquals = formatParts.every(function(el, index){
				return el.length === fieldParts[index].length && formatParts.length === fieldParts.length ;
			});
			
			if (observable && formatEquals) {
				date = $pickerRenderEl.datepicker("getDate");
				dateFormat = date ? date.format(options.format.toUpperCase()) : null;

				observable(dateFormat);
			}
		});

		ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
			$pickerRenderEl.datepicker("destroy");
		});
		
		$pickerRenderEl.is('input') ? $pickerRenderEl.mask('99/99/9999') : $('#' + $pickerRenderEl.find('input').attr('id')).mask('99/99/9999');
		$pickerRenderEl.datepicker(options);
	},
	update : function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
		var params = bindingContext.$component ? bindingContext.$component.params : valueAcessor(),
			observable = params.value,
			options = $.extend({}, $.fn.datepicker.defaults, valueAccessor()),
			$pickerRenderEl, value, date, fieldParts,
			formatParts = options.format.split('/');
		
		
		if (observable()) {
			fieldParts = observable().split('/');

			var formatEquals = formatParts.every(function(el, index){
				return el.length === fieldParts[index].length && formatParts.length === fieldParts.length ;
			});


			if(formatEquals){
				value = ko.utils.unwrapObservable(observable());
				date = value ? moment(value, options.format.toUpperCase()).toDate() : null;
				
				$pickerRenderEl = $(element);
				$pickerRenderEl.datepicker("setDate", date);
				$pickerRenderEl.val(value);
			}
		}
	}
};