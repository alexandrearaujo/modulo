var MvDateComponent = function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext, params) {

	var _options = $.extend({}, $.fn.datepicker.defaults, valueAccessor());
	var observable = params.value;
	var $pickerRenderEl = $(element);

	getDateFormat = function() {
		return _options.format.toUpperCase();
	}

	$pickerRenderEl.is('input') ? $pickerRenderEl.mask('99/99/9999') : $pickerRenderEl.find('input').mask('99/99/9999');

	var MvDate = {
		getOptions : function() {
			return _options;
		},

		setOptions : function(options) {
			_options = $.extend({}, options, _options);
		},

		registerEvents : function() {

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

			ko.utils.registerEventHandler(element, "changeDate", function() {
				if (observable) {
					var date = $pickerRenderEl.datepicker("getDate");
					var dateFormat = date ? date.format(getDateFormat()) : null;

					observable(dateFormat);
				}
			});

			ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
				$pickerRenderEl.datepicker("destroy");
			});
		},
		init : function() {
			$pickerRenderEl.datepicker(this.getOptions());
		},
		update : function() {
			if (observable) {
				var value = ko.utils.unwrapObservable(observable());
				var date = value ? moment(value, getDateFormat()).toDate() : null;

				$pickerRenderEl.datepicker("setDate", date);
				$pickerRenderEl.val(value);
			}
		}
	};

	MvDate.prototype = {
		constructor : MvDate,
	}

	return MvDate;
};

ko.bindingHandlers.mvDate = {
	init : function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
		var args = Array.prototype.slice.call(arguments);
		var attributes = bindingContext.$component ? bindingContext.$component.params : valueAcessor();
		var mvDate;

		args.push(attributes);
		mvDate = MvDateComponent.apply(this,args);
		mvDate.init();

	},
	update : function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
		var args = Array.prototype.slice.call(arguments);
		var attributes = bindingContext.$component ? bindingContext.$component.params : valueAcessor();
		var mvDate;

		args.push(attributes);
		mvDate = MvDateComponent.apply(this,args);
		mvDate.update();
	}
};