
function MvPeriod(periodElement, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
	this.periodElement = periodElement;
	this.valueAccessor = valueAccessor;
	this.allBindingsAccessor = allBindingsAccessor; 
	this.viewModel = viewModel;
	this.bindingContext = bindingContext;
	this.startDate = new MvDatePeriod($(this.periodElement).find('.start'), this.fields().startDate, this.format());
	this.endDate = new MvDatePeriod($(this.periodElement).find('.end'), this.fields().endDate, this.format());
}

MvPeriod.prototype.options = function (){
	return $.extend({}, $.fn.datepicker.defaults, this.valueAccessor());
}

MvPeriod.prototype.format = function(){
	return this.options().format.toUpperCase();
}

MvPeriod.prototype.fields = function (fieldKey){
	var component = $.extend({params: {}}, this.bindingContext.$component),
	properties = Object.assign(component , component.params , this.valueAccessor());

	var isDateField = function(key){ return key === 'startDate' || 'endDate'; },
		toValues = function (key){ var obj = {}; obj[key] = properties[key] ; return obj; },
		toObject = function(previous, current, i){ Object.assign(previous, current); return previous;};

	return Object.keys(properties).filter(isDateField)
				.map(toValues)
				.reduce(toObject, { startDate : null, endDate: null});
}

MvPeriod.prototype.destroy = function(){
	ko.utils.domNodeDisposal.addDisposeCallback(this.periodElement, function() {
		var $periodElement = $(this.periodElement);
		$periodElement.datepicker("destroy");
		ko.removeNode($periodElement.find('.start'));
		ko.removeNode($periodElement.find('.end'));
	});	
}

MvPeriod.prototype.update = function(){
	this.setPeriod();
}

MvPeriod.prototype.init = function(){
	this.startDate.registerEventHandler();
	this.endDate.registerEventHandler();
	this.destroy();
}


MvPeriod.prototype.setPeriod = function (){
	var startField = this.startDate, 
		startValue = ko.utils.unwrapObservable(this.startDate.value),  
		endField = this.endDate,
		endValue = ko.utils.unwrapObservable(this.endDate.value);  
	
	if(startValue && !endValue){
		endField.value(startValue);
	}else if(endValue && !startValue){
		startField.value(endValue);
	}
}
	

function MvDatePeriod($dateElement, dateField, format){
	this.$dateElement = $dateElement;
	this.dateElement = $dateElement.get(0);
	this.dateField = dateField;
	this.format = format;
}

MvDatePeriod.prototype.registerEventHandler = function (){
	ko.utils.registerEventHandler(this.dateElement, "show", function(e) {
		if (this.dateField.disabled) {
			$(e.target).datepicker('hide')
		}
	}.bind(this));
	
	ko.utils.registerEventHandler(this.dateElement, "clearDate", function(e) {
		var value =  ko.utils.unwrapObservable(this.dateField.value);
		if (value) {
			this.dateField.value(null);
		}
	});
		
	ko.utils.registerEventHandler(this.dateElement,'changeDate', function(e) {
		if (e.date) {
			var dateFormat = e.date.format(this.format);
			this.dateField.value(dateFormat);
		}
	}.bind(this));
}

ko.bindingHandlers.mvPeriod = {
		
	init : function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
		var mvPeriod = new MvPeriod(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
		mvPeriod.init();
		
		$(element).datepicker(mvPeriod.options());
		delete mvPeriod;
	},
	
	update : function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
		var mvPeriod = new MvPeriod(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
		mvPeriod.update();
		delete mvPeriod;
	}
};