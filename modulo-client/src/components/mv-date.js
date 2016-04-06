$.fn.datepicker.defaults.todayHighlight = true;
$.fn.datepicker.defaults.format = 'dd/mm/yyyy';
$.fn.datepicker.defaults.autoclose = true;
$.fn.datepicker.defaults.language = 'pt-BR';

ko.bindingHandlers.mvDate = {
	init : function(element, valueAccessor) {
		var params = valueAccessor(),
			options = $.extend({}, $.fn.datepicker.defaults, valueAccessor().options),
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
		
		ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
			$pickerRenderEl.datepicker("destroy");
		});

		ko.utils.registerEventHandler(element, "changeDate", function(event) {
			//Altera o observable quando o elemento é alterado
			var formatParts = options.format.split('/')
				fieldParts = $(event.currentTarget).find('input').val().split('/');

			var formatEquals = formatParts.every(function(el, index){
				return el.length === fieldParts[index].length && formatParts.length === fieldParts.length ;
			});
			
			if (observable && formatEquals) {
				observable($(event.currentTarget).find('input').val());
			}else if(!$(event.currentTarget).find('input').val() && observable()){
				observable(null);
			}
		});
		
		$pickerRenderEl.is('input') ? $pickerRenderEl.mask('99/99/9999') : $('#' + $pickerRenderEl.find('input').attr('id')).mask('99/99/9999');
		$pickerRenderEl.datepicker(options);
	},
	update : function(element, valueAccessor) {
		//Atualiza o elemento quando o observable é alterado.
		var params = valueAccessor(),
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
		}else{
			$pickerRenderEl = $(element);
			$pickerRenderEl.datepicker("setDate", null);
			$pickerRenderEl.val('');
		}
	}
}