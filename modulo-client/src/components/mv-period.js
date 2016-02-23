
function MvPeriod(){
	this.params = {}, 
	this._options = {},
	this._$pickerRenderEl = {};
	
	this.startDate = function(){
		return this.params.startDate;
	};
	
	this.endDate = function(){
		return this.params.endDate;
	};
	
	this._initProperties = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
		this._$pickerRenderEl = $(element),
		this._options = $.extend({}, $.fn.datepicker.defaults, valueAccessor());
		
		this._params.apply(this, arguments)
		this._registerEvents(element);
	};
	
	this._registerEvents = function (element) {
		
		ko.utils.registerEventHandler(element, "changeDate", function(e) {
			var observablePeriod =  $(e.target).hasClass('start') ? this.startDate().value : this.endDate().value;
			if (observablePeriod && ko.isObservable(observablePeriod) && observablePeriod()) {
				var dateFormat = e.date ? e.date.format('DD/MM/YYYY') : null;
				observablePeriod(dateFormat);
			}
		}.bind(this));
		
		ko.utils.registerEventHandler(element, "show", function(e) {
			var el = $(e.target).hasClass('start') ? this.startDate() : this.endDate();
			if (el && el.disabled) {
				$(e.target).datepicker('hide')
			}
		}.bind(this));
		
		ko.utils.registerEventHandler(element, "clearDate", function(e) {
			var observablePeriod =  $(e.target).hasClass('start') ? this.startDate().value : this.endDate().value;
			if (observablePeriod && ko.isObservable(observablePeriod)) {
				observablePeriod(null);
			}
		}.bind(this));
		
		ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
			_$pickerRenderEl.datepicker("destroy");
		}.bind(this));
	}
	
	this._params = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
		var component = $.extend({params: {}}, bindingContext.$component),
			properties = Object.assign(component , component.params , valueAccessor());
		
		var isDateField = function(key){ return key === 'startDate' || key === 'endDate'; },
			toValues = function (key){ var obj = {}; obj[key] = properties[key] ; return obj; },
			toObject = function(previous, current, i){ Object.assign(previous, current); return previous;};
		
		this.params = Object.keys(properties).filter(isDateField)
							.map(toValues)
							.reduce(toObject, { startDate : null, endDate: null});
	};
	
	this.init = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
		this._initProperties.apply(this, arguments)
		
		this._$pickerRenderEl.is('input') ? this._$pickerRenderEl.mask('99/99/9999') : $('#' + this._$pickerRenderEl.find('input').attr('id')).mask('99/99/9999');
		this._$pickerRenderEl.datepicker(this._options);
	}.bind(this);
	
	this.update = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
	
		var $startDateEl = $(element).find('.start'),
			observableStartDate = this.startDate().value;
		
		var $endDateEl = $(element).find('.end'),
			observableEndDate = this.endDate().value;
		
		if(observableStartDate && ko.isObservable(observableStartDate)){
			var value = ko.utils.unwrapObservable(observableStartDate()),
				date = value ? moment(value, this._options.format.toUpperCase()).toDate() : null;
				
			$startDateEl.datepicker("setDate", date);
			$startDateEl.val(value);
		}
		
		if(observableEndDate && ko.isObservable(observableEndDate)){
			var value = ko.utils.unwrapObservable(observableEndDate()),
				date = value ? moment(value, this._options.format.toUpperCase()).toDate() : null;
				
			$endDateEl.datepicker("setDate", date);
			$endDateEl.val(value);
		};
	}.bind(this);
};


ko.bindingHandlers.mvPeriod = new MvPeriod();