function ViewModelGenericComponent(params){
	this.params = params;
	this.params.id = params.id || getHashId();
	this.idLabel = this.params.id + 'Label';
	this.label = params.label;
	
	this.required = params.required;
	this.disabled = params.disabled;
	
	this.value = params.value;
}

function ViewModelValidationRequired(params){
	if(params.value){
		params.value.extend({ deferValidation: true	});
		if(typeof params.required == 'function'){
			params.value.extend({ required: params.required });
		}else if(params.required){
			params.value.extend({ required: true });
		}
	}
}

function ViewModelUpperCase(params){
	if(params.value){
		params.value.extend({ upperCase: !params.numeric ? true : false });
	}
}

ko.components.register('mv-date', {
    viewModel: function(params) {
    	//Herança
    	ViewModelGenericComponent.call(this, params);
    	ViewModelValidationRequired.call(this, params);
    	
        this.options = params.options || {};
    },
    template:
    	'<div class="date-field date form-group" data-bind="mvDate: options, value: params.value, attr: {disabled : params.disabled}, css: { \'has-error\' : required && value.isModified() && !value.isValid() }">\
    		<label-field params = "idLabel : idLabel, label : params.label, idField : params.id, required : params.required "></label-field>\
	        <div class="input-group  input-date-field date-field">\
    			<input type="text" class="form-control" data-bind = "attr: {id: params.id, disabled : params.disabled}, tooltipError: { value: value }" />\
		    	<span data-bind="attr : {disabled : params.disabled}" class="input-group-addon btn">\
		    		<span class="glyphicon glyphicon-calendar"></span>\
		    	</span>\
	        </div>\
    	</div>'
});

ko.components.register('mv-autocomplete',{
	viewModel : function(params) {
		
		//Herança
    	ViewModelGenericComponent.call(this, params);
    	ViewModelValidationRequired.call(this, params);
    	
		this.valueText = params.valueText;
		this.optionsValue = params.optionsValue || {};
		this.optionsText = params.optionsText || {};
		this.optionsLabel = params.optionsLabel || {};
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
    	//Herança
    	ViewModelGenericComponent.call(this, params);
    	
        this.idField = params.idField;
    },	
    template:
    	'<label data-bind="css: {required: required, \'control-label\': true}, id : idLabel, attr: { for : idField }, text: label"><span ></span></label>'	    
});

ko.components.register('mv-period', {
	viewModel: function(params) {
		//Herança
    	ViewModelGenericComponent.call(this, params);
    	this.options = params.options || {};
		this.startDate = params.startDate || {value:{}, required:{}};
		this.endDate = params.endDate || {};
	},
	template:
		'<div class="date-field-periodo form-group ">\
			<label-field params = "idLabel : idLabel, label : params.label, idField : startDate.id, required : startDate.required "></label-field>\
			<div class="input-group input-daterange" data-bind="mvPeriod: options">\
				<div class="input-group date start" >\
		    		<input type="text" class="input-sm form-control start" name="start" data-bind="attr : {disabled : startDate.disabled}, value : startDate.value"/>\
					<span class="calendar add-on input-group-addon btn" data-bind="attr : { disabled : startDate.disabled }">\
						<span class="glyphicon glyphicon-calendar"></span>\
					</span>\
		        </div>\
				<span class="input-group-addon to">a</span>\
				<div class="input-group date end">\
		        	<input type="text" class="input-sm form-control end" name="end" data-bind="attr : { disabled : endDate.disabled }, value: endDate.value" />\
					<span class="calendar add-on input-group-addon btn" data-bind="attr : { disabled : endDate.disabled }">\
						<span class="glyphicon glyphicon-calendar"></span>\
					</span>\
				</div>\
		    </div>\
		</div>'
});

ko.components.register('mv-text-field',{
	viewModel : function(params) {
		//Herança
    	ViewModelGenericComponent.call(this, params);
    	ViewModelValidationRequired.call(this, params);
    	ViewModelUpperCase.call(this, params);
    	
		this.valueUpdate = params.valueUpdate;
		this.value = params.mask ? {} : params.value;
		this.inputMask = params.mask ? {mask : params.mask, value: params.value} : {};
		this.maxLength = params.maxLength;
		this.numeric = params.numeric || false;
		
		if(params.min){
			params.value.extend({ min: params.min });
		}
		
		if(params.max){
			params.value.extend({ max: params.max });
		}
	},
	template : '<div class="form-group" data-bind="css: { \'has-error\' : required && value.isModified() && !value.isValid() }">\
		<label-field params = "idLabel : idLabel, label : label, idField : params.id, required : required "></label-field>\
		<input class="form-control" type="text"\
			data-bind="value: value, disable: disabled, valueUpdate: valueUpdate, inputMask: inputMask, tooltipError: { value: value }, attr: {maxlength: maxLength}, \
					   css: { \'numbersOnly\': numeric }" /> \
		</div>'
});

ko.components.register('mv-select-field',{
	viewModel : function(params) {
		//Herança
    	ViewModelGenericComponent.call(this, params);
    	ViewModelValidationRequired.call(this, params);
		
		this.options = params.options;
		this.optionsText = params.optionsText;
		this.optionsValue = params.optionsValue;
		this.optionsCaption = params.optionsCaption || ' ';
	},
	template : '<div class="form-group" data-bind="css: { \'has-error\' : value.isModified() && !value.isValid() }">\
		<label-field params = "idLabel : idLabel, label : label, idField : id, required : required "></label-field>\
		<select class="form-control"\
		data-bind="options: options ,\
				   optionsText: optionsText, \
				   optionsValue: optionsValue, \
				   optionsCaption: optionsCaption,\
				   value: value" />\
		</div>'
});

ko.components.register('mv-select-field-popover',{
	viewModel : function(params) {
		ViewModelGenericComponent.call(this, params);
		ViewModelValidationRequired.call(this, params);
		
		this.options = params.options;
		this.optionsText = params.optionsText;
		this.optionsValue = params.optionsValue;
		this.optionsCaption = params.optionsCaption || ' ';
		this.url = params.url;
		this.source = params.source;
		this.maxlength = params.maxlength;
		this.labelPopover = params.labelPopover;
	},
	template : '<div class="form-group" data-bind="css: { \'has-error\' : value.isModified() && !value.isValid() }">\
		<label-field params = "idLabel : idLabel, label : label, idField : params.id, required : required "></label-field>\
		<select class="form-control"\
		data-bind="mvselectpopover: {value: value, url: url, source: source, options: options, maxlength: maxlength, labelPopover: labelPopover}, tooltipError: { value: value }"">\
			<option value=""></option>\
			<optgroup label="Ações">\
				<option value="novo">\
					NOVO\
				</option>\
			</optgroup>\
			<optgroup label="Grupo agendamento" data-bind="foreach: options">\
				<option data-bind="text: findAttr($data, $parent.optionsText), value: findAttr($data, $parent.optionsValue)"></option>\
			</optgroup>\
		</select>\
		</div>'
});

ko.components.register('mv-checkbox',{
	viewModel : function(params) {
		ViewModelGenericComponent.call(this, params);
		
		this.cssClass = params.cssClass || 'checkbox-primary';
	},
	template : '<div class="form-group" data-bind="css: { \'has-error\' : value.hasOwnProperty(\'isModified\') value.isModified() && !value.isValid() }">\
		<label-field params = "idLabel : idLabel, label : label, idField : params.id, required : required "></label-field>\
		<div class="checkbox" data-bind="css: cssClass" >\
	    <input type="checkbox" checked data-bind="attr: {id: params.id, disabled : params.disabled}, checked: value, tooltipError: { value: value }"/>\
	    <label "attr: {for: params.id}">\
	    </label>\
		</div>\
		</div>'
});

ko.components.register('mv-radiobutton',{
	viewModel : function(params) {
		ViewModelGenericComponent.call(this, params);
		ViewModelValidationRequired.call(this, params);
		
		this.cssClass = params.cssClass || 'radio-primary';
		this.options = params.options || [];
	},
	template : '<div class="form-group" data-bind="css: { \'has-error\' : value.hasOwnProperty(\'isModified\') && value.isModified() && !value.isValid() }">\
		<label-field params = "idLabel : idLabel, label : label, idField : params.id, required : required "></label-field>\
			<div data-bind="foreach: options, tooltipError: { value: value }">\
				<div class="radio radio-inline" data-bind="css: $parent.cssClass">\
					<input type="radio" data-bind="attr: {id: $parent.params.id + $index(), name: $parent.params.id, disabled : $parent.params.disabled},\
						checkedValue: $data.value, checked: $parent.value"/>\
					<label data-bind="attr: {for: $parent.params.id + $index()}, text: $data.label">\
					</label>\
				</div>\
			</div>\
		</div>'
});

ko.components.register('mv-switch',{
	viewModel : function(params) {
		ViewModelGenericComponent.call(this, params);
		ViewModelValidationRequired.call(this, params);
		this.cssClass = params.cssClass || 'radio-primary';
	},
	template : '<div class="form-group" data-bind="css: { \'has-error\' : value.hasOwnProperty(\'isModified\') && value.isModified() && !value.isValid() }">\
		<label-field params = "idLabel : idLabel, label : label, idField : params.id, required : required "></label-field>\
		<p>\
			<input data-bind="mvswitch: { checked: value, onText: params.onText, offText: params.offText}"\
				type="checkbox" name="my-checkbox" />\
		</p>\
		</div>'
});