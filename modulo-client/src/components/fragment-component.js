
function ViewModelGenericComponent(params){
	this.params = params;
	this.params.id = params.id || getHashId();
	this.idLabel = this.params.id + 'Label'; 
}

ko.components.register('mv-date', {
    viewModel: function(params) {
    	//Herança
    	ViewModelGenericComponent.call(this, params);
    	
        this.options = params.options || {};
    },
    template:
    	'<div class="date-field date form-group" data-bind="mvDate: options, value: params.value, attr: {disabled : params.disabled}">\
    		<label-field params = "idLabel : idLabel, label : params.label, idField : params.id, required : params.required "></label-field>\
	        <div class="input-group  input-date-field date-field">\
    			<input type="text" class="form-control" data-bind = "attr: {id: params.id, disabled : params.disabled}" />\
		    	<span data-bind="attr : {disabled : params.disabled}" class="input-group-addon btn">\
		    		<span class="glyphicon glyphicon-calendar"></span>\
		    	</span>\
	        </div>\
    	</div>'
});

ko.components.register('mv-autocomplete',{
	viewModel : function(params) {
		this.label = params.label;
		this.id = params.id;
		this.idLabel = params.id + 'Label';
		this.required = params.required;
		this.value = params.value;
		this.valueText = params.valueText;
		this.optionsValue = params.optionsValue || {};
		this.optionsText = params.optionsText || {};
		this.optionsLabel = params.optionsLabel || {};
		this.disabled = params.disabled;
		this.source = params.source;
		this.params = params.params || function() {
			return []
		};
		this.otherValues = params.otherValues;
	},
	template : '<div class="form-group">\
		<label-field params = "idLabel : idLabel, label : label, idField : params.id, required : params.required "></label-field>\
		<input class="typeahead" type="text"\
		data-bind="mvautocomplete: { source: source,\
		optionsValue: optionsValue, optionsText: optionsText, \
		optionsLabel: optionsLabel , \
		value: value, valueText: valueText, \
		params: params(), \
		otherValues: otherValues}" /> \
		</div>'
});

ko.components.register('label-field', {
    viewModel: function(params) {
        this.label = params.label;
        this.id = params.idLabel;
        this.idField = params.idField;
        var cssClass = 'control-label';
        cssClass = params.required ? cssClass + ' required' : cssClass;
        this.cssClass = cssClass; 
    },	
    template:
    	'<label data-bind="css: cssClass, id : idLabel, attr: { for : idField }, text: label"><span ></span></label>'	    
});

ko.components.register('mv-period', {
	viewModel: function(params) {
		//Herança
    	ViewModelGenericComponent.call(this, params);
    	
		this.startDate = params.startDate || {};
		this.endDate = params.endDate || {};
	},
	template:
		'<div class="date-field-periodo form-group ">\
			<label-field params = "idLabel : idLabel, label : params.label, idField : startDate.id, required : startDate.required "></label-field>\
			<div class="input-group input-daterange" data-bind="mvDate: startDate.options, value: startDate.value">\
				<div class="input-group date" >\
		    		<input type="text" class="input-sm form-control" name="start" />\
					<span class="calendar add-on input-group-addon btn" data-bind="attr : { disabled : startDate.disabled }">\
						<span class="glyphicon glyphicon-calendar"></span>\
					</span>\
		        </div>\
				<span class="input-group-addon to">a</span>\
				<div class="input-group date">\
		        	<input type="text" class="input-sm form-control" name="end" data-bind="attr : { disabled : endDate.disabled }" />\
					<span class="calendar add-on input-group-addon btn" data-bind="attr : { disabled : endDate.disabled }">\
						<span class="glyphicon glyphicon-calendar"></span>\
					</span>\
				</div>\
		    </div>\
		</div>'
});

